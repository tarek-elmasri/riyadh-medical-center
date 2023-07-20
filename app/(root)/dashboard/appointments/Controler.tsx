"use client";
import useAppointmentsApi from "@/hooks/useAppointmentsApi";
import { Doctor } from "@prisma/client";
import SearchBar from "./SearchBar";
import { DataTable } from "@/components/ui/DataTable";
import { columns, filterKeys } from "./Columns";
import { useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/ui/Loader";

interface ControlerProps {
  doctors: Doctor[];
}

const Controler: React.FC<ControlerProps> = ({ doctors }) => {
  const { appointments, fetchData, isLoading } = useAppointmentsApi();

  const formattedAppointmentsData = useMemo(
    () =>
      appointments.map((appointment) => ({
        id: appointment.id,
        scheduleLabel: appointment.schedule.label,
        patientName: appointment.patient.patientName,
        patientPhoneNo: appointment.patient.phoneNo,
      })),
    [appointments]
  );

  return (
    <>
      {/* search bar */}
      <div className="max-w-lg">
        <SearchBar handleSearch={(data) => fetchData(data)} doctors={doctors} />
      </div>

      <Separator className="my-6" />

      {isLoading ? (
        <div className="grid place-items-center">
          <Loader />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={formattedAppointmentsData}
          filterKeys={filterKeys}
        />
      )}
    </>
  );
};

export default Controler;
