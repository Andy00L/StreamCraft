import Navbar from "@/app/components/NavBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Check } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function SucessPayemnt() {
  noStore();
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/home");
  }

  return (
    <div className="relative  flex h-fit flex-col overflow-auto overflow-x-hidden bg-background text-foreground container mx-auto px-5 lg:px-10 ">
      <Navbar />

      <main className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
        <div className="w-full min-h-[80vh] flex items-center justify-center">
          <Card className="w-[350px]">
            <div className="p-6">
              <div className="w-full flex justify-center">
                <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
              </div>
              <div className="mt-3 text-center sm:mt-5 w-full">
                <h3 className="text-lg leading-6 font-medium">
                  Payment Successfull
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Congrats on your subcription, please check your email for
                    further instructions
                  </p>
                </div>
                <div className="mt-5 sm:mt-6 w-full">
                  <Button className="w-full" asChild>
                    <Link href="/home">Go back Home</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
