"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserContext } from "../NewUserContext";
import { gqlClient } from "@/actions/gqlaction";
import { useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import UserDropDown from "./userdropdown";
import BlogDropDown from "./blogdropdown";
export default function Header() {
  const router = useRouter();
  const context = useContext(UserContext);
  const user = context?.user;

  return (
    <header className="w-screen border-b shadow-sm ">
      <div className="max-w-full mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-base w-30 sm:text-2xl sm:w-40  font-bold hover:opacity-80  transition-opacity"
        >
          Blog App
        </Link>

        <nav className="flex items-center justify-end gap-8  w-full me-4 sm:me-10 sm:w-[70%]">
          <Link href="/" className="hover:underline underline-offset-4">
            <span className="hidden sm:block">Home</span>
            <span className="block sm:hidden">
              <AiOutlineHome size={22} />
            </span>
          </Link>
          <div className="hidden sm:flex sm:gap-8">
            <Link
              href="/showBlogs"
              className="hover:underline underline-offset-4"
            >
              Blogs
            </Link>
            <Link
              href="/myBlogs"
              className="hover:underline underline-offset-4"
            >
              My Blogs
            </Link>
          </div>
          <div className="block sm:hidden">
            <BlogDropDown />
          </div>
          <UserDropDown />
        </nav>
        <Button>
          <Link href="/">
            <span className="hidden sm:block">+ Add Blog</span>
            <span className="block sm:hidden">+</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
