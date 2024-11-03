"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/" },
  { name: "Docs", href: "/docs" },
  { name: "Workspace", href: "/workspace" },
];

const MenuPrimary = () => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex gap-4 justify-end px-2">
        {links.map((link) => (
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
      </ul>
    </nav>
  );
};

export default MenuPrimary;
