import AccountManagement from "components/AdminUtils/AccountManagement";
import { adminUiType } from "enums/admin.enum";

export default function Teacher() {
  return (
    <div>
      <AccountManagement type={adminUiType.Teacher}></AccountManagement>
    </div>
  );
}
