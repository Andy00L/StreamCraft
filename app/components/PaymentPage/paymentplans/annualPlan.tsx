import { createSubscription } from "@/app/Functions";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckCircle2 } from "lucide-react";
import { SubmitButtons } from "../../SubmitButtons";

import {
  createCustomerPortal,
  getUserSubscriptionDetails,
} from "@/app/Functions";
import prisma from "@/app/lib/db";
import { PaymentPageButtons } from "../../SubmitButtons";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function AnnualPlan() {
  noStore();
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="px-12 py-6 sm:px-4 sm:py-4 md:px-6 md:py-4 flex flex-col relative rounded-2xl">
      <div className="text-left">
        <div className="flex">
          <p className="text-xl mr-2 text-green-600 ">Yearly</p>
        </div>

        <div className="mt-6 mb-6">
          <div className="flex items-end">
            <p className="text-4xl font-semibold">$300</p>
            <p className="text-lg opacity-70">/ month</p>
          </div>
          <p className="text-lg mt-2 opacity-70">billed per year</p>
        </div>
      </div>

      {user ? (
        <SubscriptionButtons />
      ) : (
        <Button className="w-full h-11 flex items-center justify-center rounded-lg drop-shadow px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t ">
          <LoginLink>Get Started</LoginLink>{" "}
        </Button>
      )}

      <div className="my-3 mx-2">
        <div className="text-xl">7 000</div>
        <div className="text-sm opacity-70"> fast generation per month</div>
      </div>
      <div className="my-3 mx-2">
        <div className="text-xl">Unlimited</div>
        <div className="text-sm opacity-70"> Slow generation</div>
      </div>
      <div className=" text-sm text-left space-y-3 mt-4 mb-6">
        <div className="flex items-center gap-1 place-items-baseline">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Prompt Optimizer</span>
        </div>
        <div className="flex items-center gap-1 place-items-baseline">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Video Creation</span>
        </div>
        <div className="flex items-center gap-1 place-items-baseline">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Image To Video</span>
        </div>
        <div className="flex items-center gap-1 place-items-baseline">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Video Fusion</span>
        </div>
        <div className="flex items-center gap-1 place-items-baseline">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Extend videos</span>
        </div>
        <div className="flex items-center gap-1 place-items-baseline">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Image Creation</span>
        </div>
      </div>
    </div>
  );
}

async function SubscriptionButtons() {
  noStore();
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const data = await getUserSubscriptionDetails(user?.id as string);
  const userprisma = await prisma.subscription.findUnique({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div className="flex justify-center gap-4 flex-col">
      {userprisma?.interval === "year" ? (
        userprisma?.cancelAtPeriodEnd ? (
          <>
            <form action={createCustomerPortal} className="w-full h-12  ">
              <PaymentPageButtons
                message="Renew Subscription"
                variation="secondary"
              />
            </form>
          </>
        ) : (
          <>
            <form action={createCustomerPortal} className="w-full h-12  ">
              <PaymentPageButtons
                message="Edit Subscription"
                variation="secondary"
              />
            </form>
          </>
        )
      ) : (
        <>
          <form
            action={createSubscription}
            className="w-full h-11 flex items-center justify-center rounded-lg drop-shadow px-8 shadow cursor-pointer active:scale-95 hover:brightness-110 transition-all bg-gradient-to-t "
          >
            <input hidden name="Subscription" value="annual" readOnly />
            <SubmitButtons message="Upgrade" variation="destructive" />
          </form>
        </>
      )}
    </div>
  );
}
