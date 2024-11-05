import { useState } from "react";
import { getUser } from "./action";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const inputClass =
  "h-8 w-full bg-amber-50/60 text-slate-900 px-2 border rounded-sm border-amber-100 focus:outline-none focus:outline-1 focus:outline-amber-300";
type LoginStatus = "idle" | "loading" | "success" | "error";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<LoginStatus>("idle");
  const [error, setError] = useState("");
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
      className="grid gap-4 p-4 bg-amber-100/10 backdrop-blur-sm h-fit w-1/2 min-w-24 rounded-sm place-self-center border-2 border-amber-100 primary-shadow"
    >
      <fieldset className="flex flex-col">
        <label htmlFor="Name" className="">
          Username
        </label>
        <input
          type="text"
          name="Name"
          value={username}
          className={inputClass}
          onChange={(e) => setUsername(e.target.value)}
          disabled={status === "loading"}
          autoComplete="username"
          autoFocus
        />
      </fieldset>
      <fieldset className="flex flex-col">
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="Password"
          value={password}
          id=""
          className={inputClass}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === "loading"}
          autoComplete="current-password"
        />
      </fieldset>
      <button type="submit" className="bg-slate-900 w-fit px-2 rounded ">
        <span>Sing Up</span>
      </button>
    </form>
  );
};

export default LoginForm;
