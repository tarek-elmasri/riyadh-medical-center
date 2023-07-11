import Navbar from "./components/Navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white min-h-full">
      <Navbar />
      <div className="w-full p-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default LandingPageLayout;
