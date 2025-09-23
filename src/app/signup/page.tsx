"use client";

import { ChangeEvent, useContext, useState } from "react";
import { useUser } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type InputValue = {
  email: String;
  password: String;
  username: String;
};

const Page = () => {
  const { setUser, user } = useUser();
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
    username: "",
  });

  const signUp = async () => {
    const response = await fetch("http://localhost:5555/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
        username: inputValue.username,
      }),
    });
    const user = await response.json();

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") {
      setInputValue((prev) => {
        return { ...prev, email: value };
      });
    }
    if (name === "password") {
      setInputValue((prev) => {
        return { ...prev, password: value };
      });
    }
    if (name === "username") {
      setInputValue((prev) => {
        return { ...prev, username: value };
      });
    }
  };

  return (
    <div>
      <Input
        placeholder="email"
        name="email"
        value={user?.email}
        onChange={(e) => handleInput(e)}
      />
      <Input
        placeholder="password"
        name="password"
        value={user?.password}
        onChange={(e) => handleInput(e)}
      />
      <Input
        placeholder="username"
        name="username"
        value={user?.username}
        onChange={(e) => handleInput(e)}
      />
      <Button
        onClick={() => {
          signUp();
        }}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Page;
