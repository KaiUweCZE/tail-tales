"use client";
import { useRouter } from "next/navigation";
import { signUp } from "./action";
import { FormEvent, useState } from "react";
import SuccessfulMessage from "@/components/successfull-message";
import Input from "@/ui/primitives/input";
import Button from "@/ui/primitives/button";
import clsx from "clsx";
import { error } from "console";

type ValidInput = {
  length: number;
  status: "valid" | "invalid" | "default";
};

const RegisterForm = () => {
  const [isOk, setIsOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isUsernameOk = userName ? userName.length >= 3 : "default";
  const isPasswordOk = password ? password.length >= 6 : "default";
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsOk((prev) => false);
    setResponseError((prev) => false);
    setIsLoading((prev) => true);
    try {
      const { user, success } = await signUp(formData);

      if (success) {
        setIsOk((prev) => true);
        setTimeout(() => setIsOk(() => false), 2500);
      }

      console.log(success);
    } catch (error) {
      setResponseError((prev) => false);
      console.error(error);
    } finally {
      setIsLoading((prev) => false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="grid gap-4 w-full max-w-xl mx-auto my-8"
    >
      <Input
        label="Username"
        size="md"
        name="name"
        placeholder="Type username"
        required
        autoFocus
        minLength={3}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        label="Password"
        size="md"
        type="password"
        name="password"
        placeholder="Type password"
        required
        minLength={6}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="light"
        disabled={!isUsernameOk || !isPasswordOk}
      >
        Sign Up
      </Button>

      <div className="grid">
        <span
          className={clsx(
            "text-xs",
            isUsernameOk && isUsernameOk !== "default" && "text-green-300",
            !isUsernameOk && "text-error"
          )}
        >
          Username: At least 3 characters
        </span>
        <span
          className={clsx(
            "text-xs",
            isPasswordOk && isPasswordOk !== "default" && "text-green-300",
            !isPasswordOk && "text-error"
          )}
        >
          Password: At least 6 characters{" "}
          {`(actual length: ${password.length})`}
        </span>
      </div>
      {isOk && (
        <SuccessfulMessage
          headline="Register is ok"
          text="Congratulations, now you can sign in!!"
        />
      )}
      {responseError && (
        <div className="flex h-fit w-fit p-4 bg-red-300">
          <span className="font-bold">An error occured</span>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
