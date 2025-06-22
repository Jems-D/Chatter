import React from "react";
import UserTable from "../../Components/UserTable/UserTable";
import Charts from "../../Components/Charts/Charts";

interface Props {}

const AdminDashboard = (props: Props) => (
  <div>
    <Charts />
    <UserTable />
  </div>
);

export default AdminDashboard;
