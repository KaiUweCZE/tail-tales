"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SubMenu from "./sub-menu";

const links = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "Workspace", href: "/workspace" },
  { name: "Login", href: "/login" },
];

const MenuPrimary = () => {
  const { data: session, status } = useSession();
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const isAuthenticated = status === "authenticated";
  const reducedLinks = isAuthenticated
    ? links.filter((link) => link.name !== "Login")
    : links;

  return (
    <nav className="pr-4 xlg:pr-0 relative">
      <ul className="flex gap-4 justify-end px-2 relative z-10">
        {reducedLinks.map((link) => (
          <li key={link.name}>
            <Link href={link.href}>
              <span
                className={clsx(``, {
                  "text-amber-200": pathname === link.href,
                })}
              >
                {link.name}
              </span>
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <li
            className="flex justify-between w-min-16 items-center font-bold capitalize cursor-pointer hover:bg-amber-50/20 px-2"
            onClick={() => setIsActive(!isActive)}
          >
            <span>{session?.user?.name}</span>
            <ChevronDown className="h-4 w-4" />
          </li>
        )}
        {isAuthenticated && (
          <SubMenu cssClass={isActive ? "sub-menu active" : "sub-menu"} />
        )}
      </ul>
    </nav>
  );
};

export default MenuPrimary;
