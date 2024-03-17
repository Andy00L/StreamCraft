import prisma from "@/app/lib/db";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log(event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutSessionCompleted(session);
    }
    // Handle subscription updated
    else if (event.type === "customer.subscription.updated") {
      const session = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(session);
    }
    // Handle subscription deleted
    else if (event.type === "customer.subscription.deleted") {
      const session = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(session);
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response("webhook error", { status: 400 });
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  );
  const customerId = String(session.customer);
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) return new Response("User not found", { status: 404 });
  const planId = subscription.items.data[0].plan.id;
  const interval = subscription.items.data[0].plan.interval as string;

  const existingSubscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  if (existingSubscription) {
    // Update the existing subscription record if it exists
    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: existingSubscription.stripeSubscriptionId,
      },
      data: {
        interval: interval,
        Status: subscription.status,
        planId: planId,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        // Update the Stripe Subscription ID in case it has changed
        stripeSubscriptionId: subscription.id,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } else {
    // Create a new subscription record if it does not exist
    await prisma.subscription.create({
      data: {
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        interval: interval,
        Status: subscription.status,
        planId: planId,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Assuming the event.data.object is the updated subscription object
  const updatedSubscription = subscription;
  const customerId = String(updatedSubscription.customer);
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) throw new Error("User not found");

  // Assuming the subscription could have multiple items but you're interested in the first one
  // This is where you'd adjust if your business logic differs
  const subscriptionItem = updatedSubscription.items.data[0];
  const planId = subscriptionItem.plan.id;
  const interval = subscriptionItem.plan.interval;

  // Retrieve the existing subscription from your database
  const existingSubscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: updatedSubscription.id },
  });
  console.log(updatedSubscription);
  if (existingSubscription) {
    // Check if the plan or other details have changed
    if (existingSubscription.planId !== planId) {
      // Plan has been changed - updating the record
      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: existingSubscription.stripeSubscriptionId,
        },
        data: {
          // Assuming your database model has these fields, adjust as necessary
          planId: planId,
          interval: interval,
          Status: updatedSubscription.status,
          currentPeriodStart: updatedSubscription.current_period_start,
          currentPeriodEnd: updatedSubscription.current_period_end,
          cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
        },
      });
      console.log(
        `Subscription for user ${user.id} updated to new plan: ${planId}`
      );
    } else if (existingSubscription.planId === planId) {
      // Handle other updates to the subscription as needed
      await prisma.subscription.update({
        where: {
          stripeSubscriptionId: existingSubscription.stripeSubscriptionId,
        },
        data: {
          // Assuming your database model has these fields, adjust as necessary
          cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end,
        },
      });
      console.log(
        `Subscription for user ${user.id} updated to new plan: ${planId}`
      );
    }
  } else {
    console.error("Existing subscription not found in the database");
    // Handle error or initiate a subscription record as necessary
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // The subscription object in the event
  const canceledSubscription = subscription;
  const customerId = String(canceledSubscription.customer);

  // Retrieve the user based on the Stripe customer ID
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error("User not found for Stripe Customer ID:", customerId);
    throw new Error("User not found");
  }

  // Retrieve the existing subscription from your database
  const existingSubscription = await prisma.subscription.findFirst({
    where: { stripeSubscriptionId: canceledSubscription.id, userId: user.id },
  });

  if (existingSubscription) {
    // Assuming you want to mark the subscription in your database as 'canceled'
    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: existingSubscription.stripeSubscriptionId, // Assuming your primary key is named 'id'
      },
      data: {
        Status: "canceled", // Adjust this field based on your database schema
        //endedAt: Math.floor(canceledSubscription.ended_at || Date.now() / 1000), // Optional: capture when the subscription ended. Check the stripe documentation for the correct property name
      },
    });
    console.log(`Subscription for user ${user.id} marked as canceled.`);
  } else {
    console.error(
      "Existing subscription not found in database for Stripe Subscription ID:",
      canceledSubscription.id
    );
    // Handle this case as per your business logic, e.g., log an error, send a notification, etc.
  }
}
