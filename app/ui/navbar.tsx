"use client";

import Link from "next/link";
import {
  HomeIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconActive,
  BriefcaseIcon as BriefcaseIconActive,
  CalendarDaysIcon as CalendarDaysIconActive,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links = [
  {
    name: "Home",
    href: "/",
    icon: { active: HomeIconActive, inactive: HomeIcon },
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: { active: BriefcaseIconActive, inactive: BriefcaseIcon },
  },
  {
    name: "Shifts",
    href: "/shifts",
    icon: { active: CalendarDaysIconActive, inactive: CalendarDaysIcon },
  },
];

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
      <nav className="w-full h-full max-w-[500px] md:mt-10 md:h-auto">
        <ul className="flex h-full justify-around md:flex-col md:gap-12 md:items-start md:w-full">
          {links.map((link) => (
            <li
              key={link.name}
              className={clsx(`w-full hover:bg-blue-100 md:py-4 md:ps-[45px]`, {
                "bg-sky-100 text-blue-600": pathname == link.href,
              })}
            >
              <Link
                href={link.href}
                className="h-full flex justify-center flex-col items-center md:flex-row md:items-start md:justify-start md:gap-2"
              >
                {pathname == link.href ? (
                  <link.icon.active className="h-6 w-6" />
                ) : (
                  <link.icon.inactive className="h-6 w-6" />
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
