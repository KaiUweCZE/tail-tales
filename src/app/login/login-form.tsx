import { useState } from "react";
import { getUser } from "./action";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/ui/primitives/button";
import Input from "@/ui/primitives/input";

type LoginStatus = "idle" | "loading" | "success" | "error";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [error, setError] = useState(""); // eslint-disable-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const validateForm = () => {
    if (!username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    if (password.length < 1) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setStatus("loading");
      setError("");

      // Check if user exists
      const user = await getUser(username);

      if (!user) {
        setError("User not found");
        setStatus("error");
        return;
      }

      if ("error" in user) {
        setError("An error occurred while checking user");
        setStatus("error");
        return;
      }

      // Try to sign in
      const result = await signIn("credentials", {
        name: username,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        setStatus("error");
        return;
      }

      if (result?.ok) {
        setStatus("success");
        // Optional: Show success message before redirect
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 w-full max-w-xl mx-auto my-8 "
    >
      <Input
        size="md"
        name="Name"
        label="Username"
        placeholder="Type Username"
        disabled={status === "loading"}
        autoComplete="username"
        autoFocus
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        size="md"
        name="Password"
        label="Password"
        type="password"
        placeholder="Type Password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={status === "loading"}
        autoComplete="current-password"
      />
      <Button
        isLoading={status === "loading"}
        loadingText="Logining..."
        type="submit"
        variant="light"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
