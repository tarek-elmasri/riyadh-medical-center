import { getAppointmentById } from "@/app/actions/getAppointments";
import { getClinics } from "@/app/actions/getClinics";
import NewAppointmentForm from "@/components/appointments/new-appointment-form";

interface AppointmentPageProps {
  params: { appointmentId: string };
}

const AppointmentPage: React.FC<AppointmentPageProps> = async ({ params }) => {
  const clinics = await getClinics();
  const appointment = await getAppointmentById(params.appointmentId);

  return (
    <div>
      <NewAppointmentForm clinics={clinics} initialAppointment={appointment} />
    </div>
  );
};

export default AppointmentPage;
