import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import Controler from "./Controler";
import { getDoctors } from "@/app/actions/getDoctors";
import { standardDate, todayInKSA } from "@/lib/utils";

const AppointmentsPage = async () => {
  const doctors = await getDoctors();
  const serverDate = new Date();
  const standard = standardDate(new Date());
  return (
    <div>
      <DashboardPageHeader
        label="الحجوزات"
        addNewURL="/dashboard/appointments/new"
      />
      {`server date: ${serverDate}`}
      {`standard date: ${standard}`}

      <Controler doctors={doctors} />
    </div>
  );
};

export default AppointmentsPage;
