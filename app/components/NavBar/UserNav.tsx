import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import Features from "./Features";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

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
          <nav className="flex items-center gap-4 text-sm font-medium ">
            <Link href="/">Use Case</Link>
            <Features />
            <Link href="/payment">Pricing</Link>
          </nav>
        </>
      )}
    </div>
  );
}
