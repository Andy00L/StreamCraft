"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { getStripeSession, stripe } from "./lib/stripe";

export async function createOrUpdateUserWithStripeCustomerId({
  email,
  id,
  firstName,
  lastName,
}: {
  email: string;
  id: string;
  firstName?: string | null;
  lastName?: string | null;
}) {
  "use server";
  if (id) {
    noStore();
    let user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, stripeCustomerId: true },
    });

    if (!user) {
      const name = `${firstName ?? ""} ${lastName ?? ""}`.trim();
      user = await prisma.user.create({
        data: { id, email, name },
      });
    }

    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({ email });
      await prisma.user.update({
        where: { id },
        data: { stripeCustomerId: customer.id },
      });
    }
  }
}

export async function getUserSubscriptionDetails(userId: string) {
  "use server";
  noStore();
  return prisma.subscription.findUnique({
    where: { userId },
    select: {
      interval: true,
      planId: true,
      user: { select: { stripeCustomerId: true } },
    },
  });
}

export async function createSubscription(formData: FormData) {
  "use server";
  noStore();
  const { getUser } = await getKindeServerSession();
  const subscriptionType = formData.get("Subscription") as string; // "annual" or "monthly"
  const user = await getUser();

  if (!user) throw new Error("User not authenticated");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { stripeCustomerId: true },
  });

  if (!dbUser?.stripeCustomerId) {
    throw new Error("User does not have a Stripe customer id");
  }
  const priceId =
    subscriptionType === "annual"
      ? process.env.STRIPE_PRICE_ID_MONTHLY
      : process.env.STRIPE_PRICE_ID_MONTHLY;

  // subscriptionType === "annual"
  // ? process.env.STRIPE_PRICE_ID_ANNUAL
  //: process.env.STRIPE_PRICE_ID_MONTHLY;

  if (!priceId) {
    throw new Error(
      `Invalid subscription type or Price ID not found for: ${subscriptionType}`
    );
  }

  const subscriptionUrl = await getStripeSession({
    customerId: dbUser.stripeCustomerId,
    domainURL:
      process.env.NODE_ENV == "production"
        ? (process.env.PRODUCTION_URL as string)
        : (process.env.DEVELOPMENT_URL as string),
    priceId: priceId,
  });

  return redirect(subscriptionUrl);
}

export async function createCustomerPortal() {
  "use server";
  noStore();
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("User not authenticated");

  const subscriptionDetails = await getUserSubscriptionDetails(user.id);

  if (!subscriptionDetails?.user?.stripeCustomerId) {
    throw new Error("User does not have a Stripe customer");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: subscriptionDetails.user.stripeCustomerId,
    return_url:
      process.env.NODE_ENV == "production"
        ? (process.env.PRODUCTION_URL as string)
        : "http://localhost:3000/home",
  });

  return redirect(session.url);
}

// Functions de la page de settings
export async function postData(formData: FormData) {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  noStore();
  const name = formData.get("name") as string;
  await prisma.user.update({
    where: {
      id: user?.id as string,
    },
    data: {
      name: name ?? undefined,
    },
  });
}
