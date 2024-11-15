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
    <nav className={`${cssClass} bg-slate-850 relative z-10`}>
      <ul>
        <li className="hover:text-amber-200 hover:bg-slate-950 z-10">
          <Link href={"/setting"}>Setting</Link>
        </li>
        <li
          onClick={handleLogout}
          className="hover:text-amber-200 hover:bg-slate-950 z-10"
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default SubMenu;
