import { Lock, Mail, Trash2 } from "lucide-react";
import Button from "../primitives/button";
import { useState } from "react";
import { User as UserType } from "next-auth";
import ChangePasswordForm from "./change-password-form";

const iconStyle = "h-4 w-4";

const ProfileSection = ({ user }: { user: UserType }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <section className="bg-slate-85 rounded h-fit p-4 shadow-m profile">
      <h2 className="text-2xl mb-2 capitalize">{user.name}</h2>
      <div className="grid gap-4">
        <div className="flex gap-4">
          <Button
            variant="light"
            leftIcon={<Mail className={iconStyle} />}
            className="w-48 justify-center items-center"
          >
            Add Email
          </Button>
        </div>
        <div className="flex gap-4">
          {/*<Lock className={iconStyle} />*/}
          <Button
            variant="light"
            leftIcon={<Lock className={iconStyle} />}
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="w-48 justify-center items-center"
          >
            {isChangingPassword ? "Close" : "Change Password"}
          </Button>
        </div>
        {isChangingPassword && user.id && (
          <ChangePasswordForm userId={user.id} />
        )}
        <div className="flex gap-4">
          <Button
            variant="error"
            className="w-48 justify-center items-center"
            leftIcon={<Trash2 className={iconStyle} />}
          >
            Delete User
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
