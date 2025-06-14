"use client";

import InforList from "./InforList";
import InforForm from "./InforForm";
import { useState } from "react";
import { Account } from "types/account";
import { adminUiType } from "enums/admin.enum";
import { Search } from "lucide-react";

export default function AccountManagement({
  type,
}: Readonly<{ type: adminUiType }>) {
  const [selectedAccount, setSelectedAccount] = useState<Account>();

  let title: string = "";
  if (type === adminUiType.Student) {
    title = "Danh sách Học viên";
  } else if (type === adminUiType.Teacher) {
    title = "Danh sách Giảng viên";
  }

  return (
    <div>
      <div className="h-[600px] flex flex-col">
        {/* Block 1: Title Page */}
        <div className="h-[10%]">
          <h1 className="text-[24px] font-bold text-blue-600">{title}</h1>
        </div>
        {/* Block 2: Filter Utility */}
        <div className="h-[10%] flex">
          <div className="w-full lg:w-[40%] flex gap-2 justify-center items-center">
            <Search size={32} />
            <input
              type="text"
              className="h-fit w-[70%] p-[8px] border-2 rounded-[40px]"
              placeholder="Nội dung tìm kiếm"
            />
          </div>
        </div>
        {/* Block 3: Content */}
        <div className="h-[80%] p-4 flex flex-col gap-20 lg:flex-row">
          <div className="w-full lg:w-[40%]">
            <InforList
              setSelectedItem={setSelectedAccount}
              type={type}
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
    </div>
  );
}
