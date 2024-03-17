import { GeneratedContent } from "../components/GenerationPage/GeneratedContent";
import Navbar from "../components/NavBar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  if (!user && (await !isAuthenticated)) {
    redirect("/");
  }
  return (
    <div className="relative  flex h-fit flex-col overflow-auto overflow-x-hidden bg-background text-foreground container mx-auto px-5 lg:px-10 ">
      <Navbar />
      <GeneratedContent />
    </div>
  );
}
