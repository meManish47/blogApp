"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import { UserContext } from "../NewUserContext";
import { User } from "lucide-react";
import { gqlClient } from "@/actions/gqlaction";
import { TbLogs } from "react-icons/tb";
import Link from "next/link";

export default function BlogDropDown() {
  const context = useContext(UserContext);
  const user = context?.user;
  const [open, setOpen] = useState(false);
  return (
    <main className="h-full w-max flex justify-center items-center ">
      <DropdownMenu
        modal={false}
        open={open}
        onOpenChange={(value) => setOpen(value)}
      >
        <DropdownMenuTrigger>
          <TbLogs size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-4 me-10">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <Link
              href="/showBlogs"
              className="hover:underline underline-offset-4"
            >
              Blogs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <Link
              href="/myBlogs"
              className="hover:underline underline-offset-4"
            >
              My Blogs
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}
