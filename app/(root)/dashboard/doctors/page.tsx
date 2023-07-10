import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import { DataTable } from "@/components/ui/DataTable";
import { columns, filterKeys } from "./Columns";
import { getDoctors } from "@/app/actions/getDoctors";

export const revalidate = 0;

const DoctorsPage = async () => {
  const doctors = await getDoctors();

  // reformat clinics into clinic column
  const formattedDoctors = doctors.map(({ id, name, title, clinic }) => ({
    id,
    name,
    title,
    clinicName: clinic.name,
  }));

  return (
    <div>
      <DashboardPageHeader label="الأطباء" addNewURL="/dashboard/doctors/new" />

      <DataTable
        columns={columns}
        data={formattedDoctors}
        filterKeys={filterKeys}
      />
    </div>
  );
};

export default DoctorsPage;
