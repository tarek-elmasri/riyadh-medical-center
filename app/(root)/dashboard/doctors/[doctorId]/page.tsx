import { getClinicById, getClinics } from "@/app/actions/getClinics";
import { getDoctorById } from "@/app/actions/getDoctors";
import DoctorForm from "@/components/doctor/doctor-form";

interface DoctorPageProps {
  params: { doctorId: string };
}

const DoctorPage: React.FC<DoctorPageProps> = async ({ params }) => {
  const doctor = await getDoctorById(params.doctorId);
  const clinics = await getClinics();

  return (
    <div>
      <DoctorForm doctor={doctor} clinics={clinics} />
    </div>
  );
};

export default DoctorPage;
