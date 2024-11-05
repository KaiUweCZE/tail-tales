import { signOut } from "next-auth/react";

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
      <ul>
        <li>settings</li>
        <li onClick={handleLogout}>logout</li>
        <li>articles</li>
        <li>hooo</li>
      </ul>
    </nav>
  );
};

export default SubMenu;
