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
    <nav className={cssClass}>
      <ul className="">
        <li>
          <Link href={"/setting"}>setting</Link>
        </li>
        <li onClick={handleLogout}>logout</li>
      </ul>
    </nav>
  );
};

export default SubMenu;
