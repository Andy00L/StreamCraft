import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createOrUpdateUserWithStripeCustomerId } from "../Functions";

import { unstable_noStore as noStore } from "next/cache";
import { default as grass } from "../../public/grass-white.png";
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
      <BentoGrid className="max-w-4xl mx-auto mt-8">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-3" : ""}
          />
        ))}
      </BentoGrid>
      <main className="pt-8 sm:pt-10 pb-16 container mx-auto max-w-6xl px-5 mb-32 sm:mb-0">
        <div className="max-w-5xl mx-auto px-8"></div>
      </main>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "Ai fusion",
    description: "Create a new video original video with AI.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br justify-center from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <Image src={grass} alt="grass"></Image>
      </div>
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Extend Video",
    description: "Never fill stuck or tired of short videos.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br justify-center from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <Image src={grass} alt="grass"></Image>
      </div>
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Photo to Video",
    description: "Make your photos live.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br justify-center from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <Image src={grass} alt="grass"></Image>
      </div>
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Ai Video",
    description: "Create a fully ai generated video from a prompt.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br justify-center from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <Image src={grass} alt="grass"></Image>
      </div>
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
