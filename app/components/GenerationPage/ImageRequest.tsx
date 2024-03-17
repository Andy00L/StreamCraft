"use server";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

export async function ImageRequest() {
  noStore();
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return "0";
  }
  const dbUser = await prisma.subscription.findUnique({
    where: { userId: user?.id },
  });
  if (dbUser?.Status === "active" && dbUser.userId === user.id) {
    const number = 1;
    return number;
  } else {
    const number = 0;
    return number;
  }
}
