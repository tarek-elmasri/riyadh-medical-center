import { getUserById } from "@/app/actions/getUsers";
import UserForm from "./user-form";

interface UserPageProps {
  params: { userId: string };
}

const UserPage: React.FC<UserPageProps> = async ({ params }) => {
  const user = await getUserById(params.userId);

  return (
    <div>
      <UserForm user={user} />
    </div>
  );
};

export default UserPage;
