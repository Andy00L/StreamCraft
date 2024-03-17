import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { BentoGridDemo } from "./components/LandingPage/BemtoPage";
import Description from "./components/LandingPage/Description";
import Navbar from "./components/NavBar";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function SalePage() {
  noStore();
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  if (user && (await isAuthenticated)) {
    redirect("/home");
  }

  return (
    <div className="relative  flex h-fit flex-col overflow-auto overflow-x-hidden bg-background text-foreground container mx-auto px-5 lg:px-10 ">
      <Navbar />

      <main className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
        <Description />
        <BentoGridDemo />
      </main>
    </div>
  );
}
