"use client";

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNavLinks = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = session?.user.isAdmin;

  const routes = [
    {
      href: "/dashboard",
      label: "الرئيسية",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/appointments",
      label: "الحجوزات",
      active: pathname === "/dashboard/appointments",
    },
    {
      href: "/dashboard/schedules",
      label: "المواعيد",
      active: pathname === "/dashboard/schedules",
    },
    {
      href: "/dashboard/doctors",
      label: "الأطباء",
      active: pathname === "/dashboard/doctors",
    },
    {
      href: "/dashboard/clinics",
      label: "العيادات",
      active: pathname === "/dashboard/clinics",
    },
  ];

  const adminRoutes = [
    {
      href: "#",
      label: "لوحة التحكم",
      active: pathname === "/panel",
    },
    {
      href: "/dashboard/users",
      label: "الموظفين",
      active: pathname === "/dashboard/users",
    },
  ];

  if (isAdmin) routes.push(...adminRoutes);
  return (
    <>
      {routes.map((route) => (
        <li key={route.href}>
          <Link
            href={route.href}
            className={cn(
              "font-medium  no-underline hover:underline underline-offset-8",
              route.active
                ? "text-black underline font-bold"
                : "text-neutral-600"
            )}
          >
            {route.label}
          </Link>
        </li>
      ))}
    </>
  );
};

export default DashboardNavLinks;
