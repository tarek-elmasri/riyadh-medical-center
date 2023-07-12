"use client";

import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "من نحن",
      active: pathname === "/",
    },
    {
      href: "/a",
      label: "خدماتنا",
      active: pathname === "/a",
    },
    {
      href: "/b",
      label: "العيادات",
      active: pathname === "/b",
    },
    {
      href: "/c",
      label: "جديدنا",
      active: pathname === "/c",
    },
  ];

  return routes;
};

export default useRoutes;
