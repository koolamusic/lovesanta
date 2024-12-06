import {
  LuBookmark,
  LuClock,
  LuLayoutDashboard,
  LuSettings,
} from "react-icons/lu";

export const items = [
  {
    value: "dashboard",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    secondary: [
      {
        value: "overview",
        label: "Overview",
      },
      { value: "profile", label: "Profile" },
    ],
  },
  {
    value: "history",
    icon: LuClock,
    label: "History",
    secondary: [
      { value: "recent", label: "Recent Activity" },
      { value: "archived", label: "Archived" },
    ],
  },
  {
    value: "favorites",
    icon: LuBookmark,
    label: "Favorites",
    secondary: [
      { value: "bookmarks", label: "Bookmarks" },
      { value: "saved-items", label: "Saved Items" },
    ],
  },
  {
    value: "settings",
    icon: LuSettings,
    label: "Settings",
    secondary: [
      { value: "account", label: "Account" },
      { value: "preferences", label: "Preferences" },
      { value: "security", label: "Security" },
    ],
  },
];

export const staticSecondaryNavItems: SecondaryNavItem[] = [
  {
    value: "overview",
    label: "Overview",
  },
  { value: "profile", label: "Profile" },
];

export type NavItem = (typeof items)[number];
export type SecondaryNavItem = NavItem["secondary"][number];
