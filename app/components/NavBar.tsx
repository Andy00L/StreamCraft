import Image from "next/image";
import Link from "next/link";
import { default as MobileLogo } from "../../public/zealgene -black.svg";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import Login from "./NavBar/Login";
import UserNav from "./NavBar/UserNav";

export default async function Navbar() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <header className="flex items-center justify-between container mt-2 h-12 mx-auto px-5 lg:px-10 py-5">
        <div className="mr-6 flex items-center space-x-2">
          <Link href="/" className=" w-full h-full">
            <Image
              src={MobileLogo}
              alt="mobile logo"
              className=" h-6 w-6 flex items-center space-x-1"
            />
          </Link>
          <span className="hidden font-bold sm:inline-block">
            Zealgene <span className="text-green-600">Beta</span>
          </span>
        </div>

        <UserNav />
        <Login />
      </header>
    </>
  );
}
