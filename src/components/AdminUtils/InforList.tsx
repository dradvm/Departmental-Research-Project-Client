import { useState } from "react";
import { Account } from "types/account";

interface InforListProps {
  setSelectedItem: (account: Account) => void;
  infors: Array<Account>;
}

export default function InforList({ setSelectedItem, infors }: InforListProps) {
  const [activatedItem, setActivatedItem] = useState<number>();

  return (
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
            {infor.name}
          </li>
        );
      })}
    </ul>
  );
}
