import { getClinics } from "@/app/actions/getClinics";
import AppointmentForm from "@/components/landing-page/appointments/appointment-form";
import FormStepIndicator from "@/components/landing-page/appointments/form-step-indicator";
import Footer from "@/components/landing-page/sections/Footer";

const ClientAppointmentPage = async () => {
  const clinics = await getClinics();

  return (
    <div className="bg-white p-6">
      <div className="  w-full max-w-7xl mx-auto ">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 place-items-center pb-6">
          {/* right side header */}
          <div className="text-center md:text-right">
            <h1 className="text-3xl md:text-6xl font-bold text-indigo-950">
              حجز موعد
            </h1>
            <p className="mt-6 text-sm md:text-xl text-indigo-800 font-bold leading-6">
              احجز موعدك في خطوات سريعة و تجنب قوائم الانتظار
            </p>
          </div>
          {/* form */}
          <div className="w-full max-w-sm grid gap-6">
            <FormStepIndicator />
            <div>
              <AppointmentForm clinics={clinics} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ClientAppointmentPage;
