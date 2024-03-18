import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Features() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>Features</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DropdownMenuLabel>
              <Link href="/comingSoon">AI Video</Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuLabel>
              <Link href="/comingSoon">Extend Video</Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuLabel>
              <Link href="/comingSoon">Photo To video</Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DropdownMenuLabel>
              <Link href="/comingSoon">Ai Fusion</Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
