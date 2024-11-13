"use client";
import { useRouter } from "next/navigation";
import { signUp } from "./action";
import { FormEvent, useState } from "react";
import SuccessfulMessage from "@/components/successfull-message";
import Input from "@/ui/primitives/input";
import Button from "@/ui/primitives/button";
import clsx from "clsx";
import ErrorMessage from "@/components/error-message";

const RegisterForm = () => {
  const [isOk, setIsOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [responseError, setResponseError] = useState<string | null>(null);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isUsernameOk = userName ? userName.length >= 3 : "default";
  const isPasswordOk = password ? password.length >= 6 : "default";
  const router = useRouter(); // eslint-disable-line @typescript-eslint/no-unused-vars

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    setIsOk(() => false);
    setResponseError(() => null);
    setIsLoading(() => true);
    try {
      const { user, success, error } = await signUp(formData); // eslint-disable-line @typescript-eslint/no-unused-vars

      if (success) {
        setIsOk(() => true);
        setTimeout(() => setIsOk(() => false), 2500);
      }
      if (!success && error) {
        setResponseError(error);
        setTimeout(() => setResponseError(() => null), 2500);
      }
    } catch (error) {
      setResponseError(() => "An error occured");
      setTimeout(() => setResponseError(() => null), 2500);
      console.error("wrong ", error);
    } finally {
      setIsLoading(() => false);
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
        maxLength={15}
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
        variant={!isUsernameOk || !isPasswordOk ? "error" : "light"}
        disabled={!isUsernameOk || !isPasswordOk}
        loadingText="Loaidng..."
        isLoading={isLoading}
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
      {responseError && <ErrorMessage headline="Error" text={responseError} />}
    </form>
  );
};

export default RegisterForm;
