import NavbarLinks from "./navbar-links";
import MobileNav from "@/components/landing-page/mobile-nav";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-white h-24 shadow-md shadow-neutral-200">
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center px-6">
        <div className="flex justify-start items-center">
          {/* mobile devices toggle menu */}
          <div className="md:hidden">
            <MobileNav />
          </div>

          {/* logo */}
          <div>
            <Image src={logo} alt="RMC" className="w-24 object-contain" />
          </div>

          <ul className="mx-auto hidden md:flex items-center justify-start gap-12">
            <NavbarLinks />
          </ul>

          {/* CTA */}
          <div className="mr-auto md:mr-0">
            <Link
              href="/appointments"
              className="mr-12 p-3 rounded-lg bg-indigo-800 hover:bg-indigo-700/95 flex items-center text-neutral-200 hover:text-white transition font-semibold shadow-md shadow-neutral-200 "
            >
              احجز موعد
            </Link>
          </div>
        </div>

        {/* <div className=" md:block md:flex-1 md:px-6">
          <ul className="w-full">
            <NavbarLinks />
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
