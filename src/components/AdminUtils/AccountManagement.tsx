"use client";

import InforList from "./InforList";
import InforForm from "./InforForm";
import { useState } from "react";
import { Account } from "types/account";
import { students, teachers } from "app/data";

export default function AccountManagement({
  type,
}: Readonly<{ type: "student" | "teacher" }>) {
  const [selectedAccount, setSelectedAccount] = useState<Account>();

  let title: string = "";
  let accounts: Array<Account>;
  if (type === "student") {
    title = "Danh sách Học viên";
    accounts = students;
  } else {
    title = "Danh sách Giảng viên";
    accounts = teachers;
  }

  return (
    <div>
      <div className="h-[500px] flex justify-evenly flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[40%] overflow-y-auto">
          <h1>{title}</h1>
          <InforList
            setSelectedItem={setSelectedAccount}
            infors={accounts}
          ></InforList>
        </div>
        <div className="w-full  lg:w-[50%]">
          {selectedAccount && (
            <InforForm
              account={selectedAccount}
              onChange={setSelectedAccount}
            ></InforForm>
          )}
        </div>
      </div>
    </div>
  );
}
