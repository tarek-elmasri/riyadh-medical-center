import { getClinics } from "@/app/actions/getClinics";
import { getDoctorById } from "@/app/actions/getDoctors";
import { getSchedules } from "@/app/actions/getSchedules";
import DoctorForm from "@/components/doctor/doctor-form";

interface DoctorPageProps {
  params: { doctorId: string };
}

const DoctorPage: React.FC<DoctorPageProps> = async ({ params }) => {
  const doctor = await getDoctorById(params.doctorId);
  const clinics = await getClinics();
  const schedules = await getSchedules();

  return (
    <div>
      <DoctorForm doctor={doctor} clinics={clinics} schedules={schedules} />
    </div>
  );
};

export default DoctorPage;
