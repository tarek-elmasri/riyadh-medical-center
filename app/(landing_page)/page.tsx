import AboutUs from "@/components/landing-page/sections/about-us";
import Hero from "@/components/landing-page/sections/hero";
import Numbers from "@/components/landing-page/sections/numbers";
import ImageContainer from "@/components/landing-page/sections/ImageContainer";
import Clinics from "@/components/landing-page/sections/clinics";
import Experts from "@/components/landing-page/sections/experts";
import Insurance from "@/components/landing-page/sections/insurance";
import CTA from "@/components/landing-page/sections/CTA";
import Footer from "@/components/landing-page/sections/Footer";

const LandingPage = () => {
  return (
    <div className="w-full">
      <Hero />
      <AboutUs />
      <Numbers />
      <ImageContainer />
      <Clinics />
      <Experts />
      <Insurance />
      <CTA />
      <Footer />
      <div className="p-6 bg-gray-600 text-center">
        <p className="text-xs font-bold text-neutral-200">
          Powered By Tarek El-Masri, All Rights Reserved. &copy; 2023
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
