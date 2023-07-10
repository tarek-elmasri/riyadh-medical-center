import { getClinicById } from "@/app/actions/getClinics";
import ClinicForm from "@/components/clinic/clinic-form";

interface ClinicPageProps {
  params: { clinicId: string };
}

const ClinicPage: React.FC<ClinicPageProps> = async ({ params }) => {
  const clinic = await getClinicById(params.clinicId);

  return (
    <div>
      <ClinicForm clinic={clinic} />
    </div>
  );
};

export default ClinicPage;
