import Stripe from "stripe";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const getStripeSession = async ({
  priceId,
  domainURL,
  customerId,
}: {
  priceId: string;
  domainURL: string;
  customerId: string;
}) => {
  noStore();
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    customer: customerId,
    success_url: `${domainURL}/payment/success`,
    cancel_url: `${domainURL}/payment/cancel`,
  });
  return session.url as string;
};
