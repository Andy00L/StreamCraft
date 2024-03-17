import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

import { default as grass } from "../../../public/grass-white.png";
export function BentoGridDemo() {
  return (
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
