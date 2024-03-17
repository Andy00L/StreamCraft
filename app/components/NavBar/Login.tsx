import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CardStackPlusIcon } from "@radix-ui/react-icons";
import { DoorClosed, HomeIcon, Settings } from "lucide-react";
import Link from "next/link";
import Features from "./Features";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function Login() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  async function createOrUpdateUserWithStripeCustomerId(userId: string) {
    "use server";
    if (user) {
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
  const data = await createOrUpdateUserWithStripeCustomerId(user?.id as string);
  return (
    <div className="flex  items-center pl-5 gap-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage
                  src={user?.picture as string}
                  alt="user profile picture"
                />
                <AvatarFallback>{data?.name || user.given_name}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.given_name}
                </p>
                <p className="text-xs text-muted-foreground leading-none">
                  {user.email}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/home" className="w-full flex justify-between">
                Home <HomeIcon className="w-4 h-4" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className=" w-full flex justify-between sm:hidden">
              <Features /> <CardStackPlusIcon className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/payment" className="w-full flex justify-between">
                Billing <CardStackPlusIcon className="w-4 h-4" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="w-full flex justify-between">
                Settings <Settings className="w-4 h-4" />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutLink className="w-full flex justify-between">
                Logout <DoorClosed className="w-5 h-5" />
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button className="h-8">
            <LoginLink>Log in</LoginLink>
          </Button>
          <Button variant={"secondary"} className="h-8">
            <RegisterLink>Sign up</RegisterLink>
          </Button>
        </>
      )}
    </div>
  );
}
