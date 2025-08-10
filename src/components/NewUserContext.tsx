"use client";

import { gqlClient } from "@/actions/gqlaction";
import { gql } from "graphql-request";
import { createContext, useEffect, useState } from "react";
type userType = {
  id: string;
  email: string;
  name: string;
};
export const UserContext = createContext<{
  user: userType | undefined;
  setUser: (user: userType) => void;
} | null>(null);
const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      name
    }
  }
`;

export default function NewUserContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<userType>();
  useEffect(() => {
    async function getCurrentUser() {
      const data: { currentUser: { id: string; email: string; name: string } } =
        await gqlClient.request(CURRENT_USER);
      const currentUser = data.currentUser;
      setUser(currentUser);
    }
    getCurrentUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
