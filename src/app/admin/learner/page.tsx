import AccountManagement from "components/AdminUtils/AccountManagement";
import { adminUiType } from "enums/admin.enum";

export default function LearnerPage() {
  return (
    <div>
      <AccountManagement type={adminUiType.Student}></AccountManagement>
    </div>
  );
}
