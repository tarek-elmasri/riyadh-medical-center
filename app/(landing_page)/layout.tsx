import Navbar from "./components/Navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white min-h-full">
      <Navbar />
      <div className="w-full h-full bg-slate-800">{children}</div>
    </div>
  );
};

export default LandingPageLayout;
