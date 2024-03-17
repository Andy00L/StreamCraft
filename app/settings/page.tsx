import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../components/NavBar";
import InformationCard from "../components/SettingsPage/GeneralDataCard";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import prisma from "../lib/db";

async function getUserSubscriptionDetails(userId: string) {
  "use server";
  noStore();
  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return data;
  }
}
export default async function Settings() {
  noStore();
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const data = await getUserSubscriptionDetails(user?.id as string);
  if (!isAuthenticated) {
    redirect("/home");
  }
  return (
    <div className="relative  flex h-fit flex-col overflow-auto overflow-x-hidden bg-background text-foreground container mx-auto px-5 lg:px-10 ">
      <Navbar />
      <InformationCard data={data} user={user} />
    </div>
  );
}
