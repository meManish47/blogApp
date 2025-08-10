"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [inputVal, setInputVal] = useState("");
  const router = useRouter();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?q=${inputVal}`);
  }
  return (
    <form className="w-[80%] h-18 flex gap-1" onSubmit={handleSubmit}>
      <Input
        placeholder="Search blogs"
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
