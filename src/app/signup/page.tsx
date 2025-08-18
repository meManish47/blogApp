"use client";
import { gqlClient } from "@/actions/gqlaction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { gql } from "graphql-request";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
const CREATE_USER = gql`
  mutation Mutation($email: String!, $password: String!, $name: String) {
    createUser(email: $email, password: $password, name: $name)
  }
`;
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  async function handleClick() {
    const data: { createUser: boolean } = await gqlClient.request(CREATE_USER, {
      email,
      password,
      name,
    });
    if (data.createUser) {
      toast.success("User created");
      router.push("/login");
    } else toast.error("Failed");
  }
  return (
    <main className="h-screen w-screen flex flex-col pt-20 justify-start">
      <div className="h-[20%] w-full flex justify-center items-center  ">
        <h1 className="scroll-m-20 text-center text-5xl font-extrabold tracking-wide text-balance">
          Signup
        </h1>
      </div>
      <div className="w-screen h-full flex flex-col justify-start items-center ">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="mt-3">Signup Details</CardTitle>
            <CardAction>
              <Button
                variant="link"
                className="cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder=""
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full cursor-pointer hover:scale-97 duration-200 transition"
              onClick={handleClick}
            >
              Sigup
            </Button>
          </CardFooter>
        </Card>

        <Button
          variant={"link"}
          className="mt-10 cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </Button>
      </div>
    </main>
  );
}
