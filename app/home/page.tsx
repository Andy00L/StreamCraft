import { HoverEffect } from "@/components/ui/card-hover-effect";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createOrUpdateUserWithStripeCustomerId } from "../Functions";

import Navbar from "../components/NavBar";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

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
          <HoverEffect items={projects} className="" />
        </div>
      </main>
    </div>
  );
}

export const projects = [
  {
    title: "Ai Video",
    description:
      "Create a video with AI. Up to 10 minutes. Sound and music Included. ",
    link: "/comingSoon",
  },
  {
    title: "Generate",
    description:
      "Just a simple text generator that uses AI to generate Images.",
    link: "/generation",
  },
  {
    title: "Extend Video",
    description:
      "Tired of short clip. Extend your video with AI to make it longer and viral.",
    link: "/comingSoon",
  },
  {
    title: "Photo To Video",
    description: "Animate you photo to a video with AI, and add music to it.",
    link: "/comingSoon",
  },
  {
    title: "Ai Fusion",
    description:
      " Fusion images or videos with AI to create a new image or video.",
    link: "/comingSoon",
  },
];
