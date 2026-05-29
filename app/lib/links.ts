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

export const links = [
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
    {
      name: "Shdifts",
      href: "/shiftfs",
      icon: { active: CalendarDaysIconActive, inactive: CalendarDaysIcon },
    },
]
