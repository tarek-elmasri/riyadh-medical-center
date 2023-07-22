"use client";

import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/#aboutus",
      label: "نبذة عنا",
      active: pathname === "/#aboutus",
    },
    {
      href: "/#clinics",
      label: "العيادات",
      active: pathname === "/#clinics",
    },
    {
      href: "/#experts",
      label: "الأطباء",
      active: pathname === "/#experts",
    },
    {
      href: "/#insurance",
      label: "النأمين",
      active: pathname === "/@insurance",
    },
  ];

  return routes;
};

export default useRoutes;
