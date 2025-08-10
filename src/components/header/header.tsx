"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gql } from "graphql-request";
import { gqlClient } from "@/actions/gqlaction";
import { useEffect, useState } from "react";
const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
    }
  }
`;
export default function Header() {
  const [currentUser, setCurrentUser] = useState<{
    id: String;
    email: String;
  }>();
  useEffect(() => {
    async function getCurrentUser() {
      const data: { currentUser: { id: String; email: String } } =
        await gqlClient.request(CURRENT_USER);
      const currentUser = data.currentUser;
      setCurrentUser(currentUser);
    }
    getCurrentUser();
  }, [currentUser]);
  return (
    <header className="w-full border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <Link
          href="/"
          className="text-lg font-bold hover:opacity-80 transition-opacity"
        >
          Blog App
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:underline underline-offset-4">
            Home
          </Link>
          <Link
            href="/showBlogs"
            className="hover:underline underline-offset-4"
          >
            Blogs
          </Link>
          <Link href="/myBlogs" className="hover:underline underline-offset-4">
            My Blogs
          </Link>

          {!currentUser ? (
            <Link href="/login" className="hover:underline underline-offset-4">
              Login
            </Link>
          ) : (
            <Link href="/login" className="hover:underline underline-offset-4">
              Logout
            </Link>
          )}
        </nav>

        {/* Call to Action */}
        <Button asChild>
          <Link href="/">+ Add Blog</Link>
        </Button>
      </div>
    </header>
  );
}
