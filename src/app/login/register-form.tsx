"use client";
import { useRouter } from "next/navigation";
import { signUp } from "./action";
import { FormEvent, useState } from "react";
import SuccessfulMessage from "@/components/successfull-message";

const RegisterForm = () => {
  const [isOk, setIsOk] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(false);
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
      className="flex flex-col relative gap-4 p-8 mx-auto bg-amber-100/30 rounded-lg max-w-md w-full"
    >
      <input
        type="text"
        name="name"
        placeholder="Username"
        className="p-2 text-slate-900 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        required
        minLength={1}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="p-2 text-slate-900 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        required
        minLength={1}
      />

      <button
        type="submit"
        className="p-2 rounded text-white font-semibold bg-blue-500 hover:bg-blue-600"
      >
        Register
      </button>
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
