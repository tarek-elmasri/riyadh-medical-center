"use client";

import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/#aboutUs",
      label: "من نحن",
      active: pathname === "/",
    },
    {
      href: "/#services",
      label: "خدماتنا",
      active: pathname === "/a",
    },
    {
      href: "#",
      label: "العيادات",
      active: pathname === "/b",
    },
    {
      href: "#",
      label: "جديدنا",
      active: pathname === "/c",
    },
  ];

  return routes;
};

export default useRoutes;
