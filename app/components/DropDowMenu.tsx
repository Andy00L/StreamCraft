import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Features from "./NavBar/Features";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function DropDownMenu() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="sm:w-32">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <Link href="/">AI Video</Link>
              </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <Link href="/">Extend Video</Link>
              </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <Link href="/">Photo To video</Link>
              </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <Link href="/">Ai Fusion</Link>
              </DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DropdownMenuLabel>
                <LogoutLink>Logout</LogoutLink>
              </DropdownMenuLabel>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <DropdownMenuLabel>
                  <Link href="/">Use Case</Link>
                </DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuLabel>
                  <Features />
                </DropdownMenuLabel>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <DropdownMenuLabel>
                  <Link href="/payment">Pricing</Link>
                </DropdownMenuLabel>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DropdownMenuLabel>
                  <LoginLink>Log in</LoginLink>
                </DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuLabel>
                  <RegisterLink>Sign up</RegisterLink>
                </DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
