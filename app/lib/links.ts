import {
  HiOutlineHome as HomeIcon,
  HiHome as HomeIconActive,
  HiOutlineBuildingOffice as BuildingOfficeIcon,
  HiBuildingOffice as BuildingOfficeIconActive,
  HiOutlineCalendarDays as CalendarDaysIcon,
  HiCalendarDays as CalendarDaysIconActive,
  HiOutlineCurrencyYen as CurrencyYenIcon,
  HiCurrencyYen as CurrencyYenIconActive,
} from "react-icons/hi2";

export const links = [
  {
    name: "ホーム",
    href: "/",
    icon: { active: HomeIconActive, inactive: HomeIcon },
  },
  {
    name: "勤務先",
    href: "/jobs",
    icon: { active: BuildingOfficeIconActive, inactive: BuildingOfficeIcon },
  },
  {
    name: "シフト",
    href: "/shifts",
    icon: { active: CalendarDaysIconActive, inactive: CalendarDaysIcon },
  },
  {
    name: "収入",
    href: "/earnings",
    icon: { active: CurrencyYenIconActive, inactive: CurrencyYenIcon },
  },
];
