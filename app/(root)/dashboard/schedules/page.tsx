import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./Columns";
import { getSchedulesByQuery } from "@/app/actions/getSchedules";

export const revalidate = 0;

const SchedulesPage = async () => {
  const schedules = await getSchedulesByQuery({ archived: false });

  return (
    <div>
      <DashboardPageHeader
        label="المواعيد"
        addNewURL="/dashboard/schedules/new"
      />

      <DataTable columns={columns} data={schedules} />
    </div>
  );
};

export default SchedulesPage;
