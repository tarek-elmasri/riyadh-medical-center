import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import Controler from "./Controler";
import { getDoctors } from "@/app/actions/getDoctors";

const AppointmentsPage = async () => {
  const doctors = await getDoctors();

  return (
    <div>
      <DashboardPageHeader label="الحجوزات" />

      <Controler doctors={doctors} />
    </div>
  );
};

export default AppointmentsPage;
