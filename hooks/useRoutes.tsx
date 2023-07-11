"use client";

import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "من نحن",
      active: pathname === "",
    },
    {
      href: "/a",
      label: "خدماتنا",
      active: pathname === "/",
    },
    {
      href: "/b",
      label: "العيادات",
      active: pathname === "/",
    },
    {
      href: "/c",
      label: "جديدنا",
      active: pathname === "/",
    },
  ];

  return routes;
};

export default useRoutes;
