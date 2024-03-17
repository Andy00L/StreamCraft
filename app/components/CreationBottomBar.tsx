import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitButtons } from "./SubmitButtons";

export function CreationBottomBar() {
  return (
    <div className=" bottom-0 z-10 w-full  h-24">
      <div className="flex items-center justify-between mr-10 px-5 lg:px-10 h-full">
        <Button variant="secondary" size="lg" asChild>
          <Link href="/home">Cancel</Link>
        </Button>
        <SubmitButtons message="Next" variation="default" />
      </div>
    </div>
  );
}
