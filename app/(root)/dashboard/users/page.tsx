import DashboardPageHeader from "@/components/dashboard/dashboard-page-header";
import { DataTable } from "@/components/ui/DataTable";
import { columns, filterKeys } from "./Columns";
import { getUsers } from "@/app/actions/getUsers";

export const revalidate = 0;

const UsersPage = async () => {
  const users = await getUsers();

  // reformat users into user column
  const formattedUsers = users.map(({ id, name, email, isAdmin }) => ({
    id,
    name,
    email,
    isAdmin,
  }));

  return (
    <div>
      <DashboardPageHeader label="الموظفين" addNewURL="/dashboard/users/new" />

      <DataTable
        columns={columns}
        data={formattedUsers}
        filterKeys={filterKeys}
      />
    </div>
  );
};

export default UsersPage;
