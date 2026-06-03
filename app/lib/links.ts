import { 
    HiOutlineHome as HomeIcon,
    HiHome as HomeIconActive,
    HiOutlineBuildingOffice as BuildingOfficeIcon,
    HiBuildingOffice as BuildingOfficeIconActive,
    HiCalendarDays as CalendarDaysIcon,
    HiOutlineCalendarDays as CalendarDaysIconActive,
    HiOutlineCurrencyYen as CurrencyYenIcon,
    HiCurrencyYen as CurrencyYenIconActive,
 } from "react-icons/hi2";


export const links = [
    {
      name: "Home",
      href: "/",
      icon: { active: HomeIconActive, inactive: HomeIcon },
    },
    {
      name: "Jobs",
      href: "/jobs",
      icon: { active: BuildingOfficeIconActive, inactive: BuildingOfficeIcon },
    },
    {
      name: "Shifts",
      href: "/shifts",
      icon: { active: CalendarDaysIconActive, inactive: CalendarDaysIcon },
    },
    {
      name: "Earnings",
      href: "/earnings",
      icon: { active: CurrencyYenIconActive, inactive: CurrencyYenIcon },
    },
]
