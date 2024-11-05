"use client";
import RegisterForm from "./register-form";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <main className="grid maximum-w mx-auto">
      <LoginForm />
      <RegisterForm />
    </main>
  );
};

export default LoginPage;
