import { useEffect, useState } from "react";
import { teachers, students } from "app/data";
import { adminUiType } from "app/enums/admin.enum";
import { Account } from "types/account";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

interface InforListProps {
  setSelectedItem: (account: Account) => void;
  type: adminUiType;
}

export default function InforList({ setSelectedItem, type }: InforListProps) {
  const [activatedItem, setActivatedItem] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [infors, setInfors] = useState<Account[]>();

  useEffect(() => {
    const limit = 10;
    const skip = (page - 1) * limit;
    let data: Account[] = [];
    if (type === adminUiType.Student) data = teachers;
    else if (type === adminUiType.Teacher) data = students;
    const newData = data.slice(skip, skip + limit);
    setInfors(newData);
  }, [page, type]);

  return (
    <div>
      {!infors || infors.length === 0 ? (
        <div>Danh sách trống</div>
      ) : (
        <ul>
          {infors.map((infor, index) => {
            return (
              <li
                key={index}
                className={`px-6 py-2 border-b hover:underline cursor-pointer
               ${infor.idUser === activatedItem ? "bg-blue-100" : ""} 
            `}
                onClick={() => {
                  if (infor.idUser !== activatedItem) {
                    setSelectedItem(infor);
                    setActivatedItem(infor.idUser);
                  }
                }}
              >
                {infor.idUser + ". " + infor.name}
              </li>
            );
          })}
        </ul>
      )}
      {/* Button Pagination */}
      <div className="h-[10%] flex gap-[8px] justify-center">
        <button
          className="h-fit mt-[8px] p-[4px]"
          onClick={() => {
            if (page !== 1) setPage((curr) => curr - 1);
          }}
          title="Quay lại trang trước"
        >
          <ArrowBigLeft size={32} />
        </button>
        <button className="h-fit mt-[8px] p-[4px] text-[20px]">
          Trang {page}
        </button>
        <button
          className="h-fit mt-[8px] p-[4px]"
          onClick={() => {
            if (infors?.length === 10) setPage((curr) => curr + 1);
          }}
          title="Trang tiếp theo"
        >
          <ArrowBigRight size={32} />
        </button>
      </div>
    </div>
  );
}
