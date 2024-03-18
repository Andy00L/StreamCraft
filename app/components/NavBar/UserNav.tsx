import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Features from "./Features";
import { NavigationMenuDemo } from "./NavigationsMenu";

export default async function UserNav() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="hidden md:flex items-center gap-2">
      {user ? (
        <nav className="flex items-center gap-6 text-sm font-medium ">
          <Button variant={"outline"} className="h-8">
            <Link href="/home">AI Video</Link>
          </Button>
          <Button variant={"outline"} className="h-8">
            <Link href="/comingSoon">Extend Video</Link>
          </Button>
          <Button variant={"outline"} className="h-8">
            <Link href="/comingSoon">Photo To video</Link>
          </Button>
          <Button variant={"outline"} className="h-8">
            <Link href="/comingSoon">Ai Fusion</Link>
          </Button>
        </nav>
      ) : (
        <>
          <NavigationMenuDemo />
        </>
      )}
    </div>
  );
}
