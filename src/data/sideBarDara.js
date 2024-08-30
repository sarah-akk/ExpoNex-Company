/* eslint-disable prettier/prettier */
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilUsdSquare,
  UilSetting,
  UilMoneyWithdrawal,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

import logo from "../assets/logos/logo.png";

export const SideBarData = [
  {
    icon: UilEstate,
    heading: "Home",
    link: "/dashboard/Home",
  },
  {
    icon: UilClipboardAlt,
    heading: "Activity",
    link: "/dashboard/Activity",
  },
  {
    icon: UilPackage,
    heading: "My Sections",
    link: "/dashboard/sections",
  },
  {
    icon: UilUsdSquare,
    heading: "My Products",
    link: "/dashboard/products",
  },
  {
    icon: UilUsersAlt,
    heading: "notifications",
    link: "/dashboard/notifications",
  },
  {
    icon: UilSetting,
    heading: "Settings",
    link: "/dashboard/settings",
  },

];
