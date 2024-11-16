import { changePassword } from "@/app/setting/action";
import Button from "../primitives/button";
import Input from "../primitives/input";
import { FormEvent, useState } from "react";
import SuccessfulMessage from "@/components/successfull-message";
import ErrorMessage from "@/components/error-message";
import { Loader2 } from "lucide-react";

const ChangePasswordForm = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [formState, setFormState] = useState<{
    state: "default" | "success" | "error";
    text: string;
  }>({ state: "default", text: "" });
  const isValid = newPassword === repeatedPassword && newPassword.length >= 6;

  const handleTimeout = (
    state: "default" | "success" | "error",
    text: string
  ) => {
    setFormState({ state, text });
    setTimeout(() => {
      setFormState({ state: "default", text: "" });
    }, 3000);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormState({ state: "default", text: "" });

    if (!newPassword) {
      handleTimeout("error", "New password is required");
      return;
    }

    if (!isValid) {
      handleTimeout("error", "Passwords don't match or are too short");
      return;
    }

    try {
      const result = await changePassword(userId, newPassword, oldPassword);

      if (result.success) {
        handleTimeout(
          "success",
          result.message || "Password successfully changed"
        );
        // Reset form
        setOldPassword("");
        setNewPassword("");
        setRepeatedPassword("");
      } else {
        handleTimeout("error", result.error || "Failed to change password");
      }
    } catch (error) {
      handleTimeout("error", "An unexpected error occurred");
      console.error("Password change failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="grid gap-2">
        <Input
          type="password"
          size="md"
          placeholder="old password"
          minLength={6}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          type="password"
          size="md"
          placeholder="new password"
          minLength={6}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          size="md"
          placeholder="repeat new password"
          minLength={6}
          onChange={(e) => setRepeatedPassword(e.target.value)}
        />
        <Button
          variant="light"
          type="submit"
          leftIcon={isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          disabled={isLoading}
        >
          Change Password
        </Button>
      </form>
      {formState.state === "success" && (
        <SuccessfulMessage headline="Change Password" text={formState.text} />
      )}
      {formState.state === "error" && (
        <ErrorMessage headline="Error" text={formState.text} />
      )}
    </>
  );
};

export default ChangePasswordForm;
