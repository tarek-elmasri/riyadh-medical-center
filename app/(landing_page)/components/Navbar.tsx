import NavbarLinks from "./navbar-links";
import MobileNav from "./mobile-nav";

const Navbar = () => {
  return (
    <div className="h-24  bg-slate-800 shadow-md">
      <div className="flex h-full justify-between md:justify-start items-center">
        <div className="navbar-triangle px-6 md:px-12 md:w-64 h-full  flex items-center md:bg-sky-700">
          {/* mobile devices toggle menu */}
          <div className="md:hidden">
            <MobileNav />
          </div>
          {/* logo */}
          <p className="mt-2 font-bold text-sky-500 md:text-slate-800 text-2xl md:text-3xl ">
            RMC
          </p>
        </div>
        <div className=" md:block md:flex-1 md:px-6">
          <ul className="w-full">
            <NavbarLinks />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
