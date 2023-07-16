import AboutUs from "@/components/landing-page/sections/about-us";
import Hero from "@/components/landing-page/sections/hero";
import Services from "@/components/landing-page/sections/services";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Services />
      <div className="p-6 bg-gray-600 text-center">
        <p className="text-xs font-bold text-neutral-200">
          Powered By Tarek El-Masri, All Rights Reserved. &copy; 2023
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
