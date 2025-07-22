"use client";
import AccountManagement from "components/AdminUtils/AccountManagement";
import withRole from "components/WithRole/withRole";

function LearnerPage() {
  return (
    <div>
      <AccountManagement type={"USERS"}></AccountManagement>
    </div>
  );
}

export default withRole(LearnerPage, ["ADMIN"]);