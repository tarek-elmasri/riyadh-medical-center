import { getCurrentList } from "@/app/actions/pusher";
import { getDoctorsCounterList } from "@/app/actions/getDoctors";
import CounterClient from "@/components/counters/counter-client";
import CounterList from "@/components/counters/counter-list";

const CounterPage = async () => {
  const currentDoctorList = await getCurrentList();

  const doctorsList = await getDoctorsCounterList(currentDoctorList);

  return (
    <div>
      <CounterList initialList={doctorsList} />
      <div className="mt-6 flex flex-col md:flex-row justify-center items-center flex-wrap gap-12">
        <CounterClient initialData={currentDoctorList} />
      </div>
    </div>
  );
};

export default CounterPage;
