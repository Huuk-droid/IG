"use client";

import { ChangeEvent, useContext, useState } from "react";
import { useUser } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type InputValue = {
  email: String;
  password: String;
};

const Page = () => {
  const { setUser, user } = useUser();
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
  });

  const login = async () => {
    const response = await fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    });
    const user = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  if (user) push("/");

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
  };

  return (
    <div>
      <Input
        placeholder="email"
        name="email"
        onChange={(e) => handleInput(e)}
      />
      <Input
        placeholder="password"
        name="password"
        onChange={(e) => handleInput(e)}
      />
      <Button
        onClick={() => {
          login();
        }}
      >
        Log in
      </Button>
    </div>
  );
};

export default Page;
