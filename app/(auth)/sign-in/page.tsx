import getSession from "@/app/actions/getSession";
import AuthenticationForm from "@/components/AuthenticationForm";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

const AuthenticationPage = async () => {
  //TODO: to be adjusted in middleware
  const session = await getSession();
  if (session?.user?.email) {
    redirect("/dashboard");
  }

  return (
    <div className="h-full w-full min-h-full flex justify-center items-center px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-md border border-neutral-200 shadow-xl">
        <h1 className="font-bold text-xl md:text-2xl text-center">
          مستوصف الطبي الحديث
        </h1>
        <Separator className="my-6" />
        <AuthenticationForm />
      </div>
    </div>
  );
};

export default AuthenticationPage;
