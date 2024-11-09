"use client";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";
import { useState } from "react";
import Button from "@/ui/primitives/button";

const LoginPage = () => {
  const [activeForm, setActiveForm] = useState<"signin" | "signup">("signin");
  return (
    <main className="grid maximum-w mx-auto place-items-center">
      <div className="w-full max-w-xl mx-auto mt-16">
        <Button
          variant="toggle"
          active={activeForm === "signin"}
          onClick={() => setActiveForm("signin")}
        >
          Sing In Form
        </Button>
        <Button
          variant="toggle"
          active={activeForm === "signup"}
          onClick={() => setActiveForm("signup")}
        >
          Sign Up Form
        </Button>
      </div>
      {activeForm === "signin" && <LoginForm />}
      {activeForm === "signup" && <RegisterForm />}
    </main>
  );
};

export default LoginPage;
