import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import { DataTable } from "@/components/ui/DataTable";
import { columns, filterKeys } from "./Columns";
import { getClinics } from "@/app/actions/getClinics";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

export const revalidate = 0;

const ClinicsPage = async () => {
  const clinics = await getClinics();

  // reformat clinics into clinic column
  const formattedClinics = clinics.map(({ id, name, createdAt, doctors }) => ({
    id,
    name,
    doctorsCount: doctors.length,
    createdAt: format(createdAt, "yyyy-MM-dd", { locale: arSA }),
  }));

  return (
    <div>
      <DashboardPageHeader
        label="العيادات"
        addNewURL="/dashboard/clinics/new"
      />

      <DataTable
        columns={columns}
        data={formattedClinics}
        filterKeys={filterKeys}
      />
    </div>
  );
};

export default ClinicsPage;
