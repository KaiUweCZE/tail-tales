import { Hammer, Lock, Mail, Trash2 } from "lucide-react";
import Button from "../primitives/button";
import { useState } from "react";
import { User as UserType } from "next-auth";
import ChangePasswordForm from "./change-password-form";
import { MetaConfiguration } from "@/app/setting/types";

const iconStyle = "h-4 w-4";

const ProfileSection = ({
  user,
  configs,
}: {
  user: UserType;
  configs: MetaConfiguration[];
}) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <section className="bg-slate-800 rounded-lg h-fit p-6 shadow-lg profile">
      <h2 className="text-xl capitalize font-semibold text-amber-100 mb-4">
        {`${user.name} Profile`}
      </h2>
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
        <div className="flex gap-4">
          <Button
            variant="error"
            className="w-48 justify-center items-center"
            leftIcon={<Hammer className={iconStyle} />}
            onClick={() => console.log(configs)}
          >
            Create New Configuration
          </Button>
        </div>
      </div>
      <div>
        <ul>
          {configs.map((config) => (
            <li key={config.id}>{config.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProfileSection;
