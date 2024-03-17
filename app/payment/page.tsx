import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../components/NavBar";
import PaymentSection from "../components/PaymentPage/PaymentSection";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function Payment() {
  noStore();
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (!user && (await !isAuthenticated)) {
    redirect("/");
  }
  return (
    <div className="relative  flex h-fit flex-col overflow-auto overflow-x-hidden bg-background text-foreground container mx-auto px-5 lg:px-10 ">
      <Navbar />
      <div className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
        <div className="sm:flex sm:flex-col sm:align-center">
          <div className="text-3xl sm:text-4xl md:text-5xl font-logo font-bold mt-0 text-center">
            StreamCraft <span className="text-green-600">Pro</span>
          </div>
          <p className="text-center text-lg sm:text-xl mt-4">
            Choose the plan that’s right for you
          </p>
        </div>
        <div className=" mt-7 text-center"></div>
        <PaymentSection />
      </div>
    </div>
  );
}
