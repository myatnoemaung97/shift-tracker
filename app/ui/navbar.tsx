"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { links } from "@/app/lib/links";

export default function Sidenav() {
  const pathname = usePathname();

  return (
    <aside className="bg-[#FAFAFC] fixed bottom-0 left-0 right-0 h-[60px] flex justify-center items-center md:flex-col md:justify-start md:items-center md:top-0 md:left-0 md:w-[185px] md:h-screen">
      <Link href="/">
        <Image
          src="/shifto-logo.png"
          alt="Shifto Logo"
          width={175}
          height={175}
          className="hidden md:block"
        />
      </Link>
      <nav className="w-full h-full md:mt-10 md:h-auto">
        <ul className="flex h-full justify-around md:flex-col md:gap-2 md:items-start md:w-full">
          {links.map((link) => (
            <li
              key={link.name}
              className={clsx(`w-full hover:bg-blue-100 md:py-4 md:ps-[45px]`, {
                "bg-indigo-100 text-indigo-600": pathname == link.href,
              })}
            >
              <Link
                href={link.href}
                className="h-full flex justify-center flex-col items-center md:flex-row md:items-start md:justify-start md:gap-2"
              >
                {pathname == link.href ? (
                  <link.icon.active className="h-5 w-5" />
                ) : (
                  <link.icon.inactive className="h-5 w-5" />
                )}
                <span className="text-lg">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
