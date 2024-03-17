import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createOrUpdateUserWithStripeCustomerId } from "../Functions";
import Navbar from "../components/NavBar";

export default async function home() {
  noStore();
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!user && !(await isAuthenticated)) {
    redirect("/");
  }

  await createOrUpdateUserWithStripeCustomerId({
    email: user?.email as string,
    id: user?.id as string,
    firstName: user?.given_name as string,
    lastName: user?.family_name as string,
  });

  return (
    <div className="relative  flex h-fit flex-col overflow-auto overflow-x-hidden bg-background text-foreground container mx-auto px-5 lg:px-10 ">
      <Navbar />

      <main className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
        <div className="max-w-5xl mx-auto px-8">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Generation</CardTitle>
              <CardDescription>Create Images with Ai</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Link href="/generation">Generation</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
