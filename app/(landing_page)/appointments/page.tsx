import { getClinics } from "@/app/actions/getClinics";
import AppointmentForm from "./components/appointment-form";
import FormStepIndicator from "./components/form-step-indicator";

const ClientAppointmentPage = async () => {
  const clinics = await getClinics();

  return (
    <div className="p-8  w-full max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 place-items-center pb-6">
        {/* left side header */}
        <div className="text-center md:text-right">
          <h1 className="text-3xl md:text-6xl font-bold text-sky-400">
            حجز موعد
          </h1>
          <p className="mt-2 text-sm md:text-xl text-neutral-200 font-bold leading-6">
            احجز موعدك في خطوات سريعة و تجنب قوائم الانتظار
          </p>
        </div>

        {/* form */}
        <div className="w-full max-w-md grid gap-6">
          <FormStepIndicator />
          <div>
            <AppointmentForm clinics={clinics} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAppointmentPage;
