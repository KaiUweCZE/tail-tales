import { signOut } from "next-auth/react";
import Link from "next/link";

const SubMenu = ({ cssClass }: { cssClass: string }) => {
  const handleLogout = async () => {
    try {
      await signOut({
        redirectTo: "/",
        redirect: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className={`${cssClass} bg-slate-800`}>
      <ul className="">
        <li>
          <Link href={"/setting"}>Setting</Link>
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default SubMenu;
