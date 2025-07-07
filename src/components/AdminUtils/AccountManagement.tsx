"use client";

import InforList from "./InforList";
import InforForm from "./InforForm";
import { ChangeEvent, useEffect, useState } from "react";
import { UserType, UserUpdateBody } from "types/user";
import { adminUiType } from "enums/admin.enum";
import { Search, X } from "lucide-react";
import { UserReq } from "types/user";
import { userService } from "services/user.service";
import { Modal } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Pagination } from "./Pagination";

export default function AccountManagement({
  type,
}: Readonly<{ type: adminUiType }>) {
  const [page, setPage] = useState<number>(1);
  const [infors, setInfors] = useState<UserType[]>();
  const [selectedAccount, setSelectedAccount] = useState<UserType>();
  const [open, setOpen] = useState<boolean>(false);

  // open modal
  function handleOpen() {
    setOpen(true);
  }
  // close modal
  function handleClose() {
    setOpen(false);
  }

  const [filter, setFilter] = useState({
    searchText: undefined,
  });

  function onChangeFilterInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPage(1);
    setFilter((preFilter) => ({
      ...preFilter,
      [name]: value,
    }));
  }

  const limit = 5;

  async function fetchData(
    page: number,
    filter: { searchText?: string },
    type: adminUiType
  ) {
    const skip = (page - 1) * limit;
    const params: UserReq = {
      limit,
      skip,
      role: type === adminUiType.Student ? "USERS" : "USERS",
      searchText: filter.searchText,
    };
    try {
      const dataDB: UserType[] = (await userService.getAllUser(params)).data
        .data;
      setInfors(dataDB);
    } catch (e) {
      toast.error("Có lỗi khi lấy dữ liệu người dùng!");
      console.log("Lỗi lấy dữ liệu người dùng: ", e);
      setInfors([]);
    }
  }

  useEffect(() => {
    fetchData(page, filter, type);
  }, [page, filter, type]);

  // update an account
  async function updateAccount(
    userId: number,
    name?: string,
    biography?: string,
    img?: string
  ) {
    try {
      const bodyReq: UserUpdateBody = {
        id: userId,
        name,
        biography,
        img,
      };
      console.log(bodyReq);
      await userService.updateAccount(bodyReq);
      toast.success("Cập nhật tài khoản thành công!");
      handleClose();
      fetchData(page, filter, type);
    } catch (e) {
      toast.error("Lỗi xảy ra khi cập nhật tài khỏan!");
      console.log("Lỗi xảy ra khi cập nhật tài khoản: ", e);
    }
  }

  // delete an account
  async function deleteAccount(userId: number) {
    if (confirm(`Xác nhận xóa tài khoản này?`))
      try {
        await userService.deleteAccount(userId);
        toast.success("Xóa tài khoản thành công!", { autoClose: 3000 });
        await fetchData(page, filter, type);
      } catch (e) {
        toast.error("Có lỗi khi xóa tài khoản!", { autoClose: 3000 });
        console.log("Lỗi khi xóa tài khoản người dùng: ", e);
      }
  }

  return (
    <div>
      <div className="h-fit my-4 flex flex-col gap-4">
        {/* Block 2: Filter Utility */}
        <div className="h-fit flex">
          <div className="w-full flex gap-2 justify-center items-center">
            <Search size={32} />
            <input
              type="text"
              className="h-fit w-[70%] p-[8px] border-2 rounded-[40px]"
              placeholder="Nội dung tìm kiếm"
              name="searchText"
              value={filter.searchText ?? ""}
              onChange={onChangeFilterInput}
            />
          </div>
        </div>
        {/* Block 3: Content */}
        <div className="p-4 flex gap-20">
          <div className="w-full">
            <InforList
              infors={infors}
              setSelectedItem={setSelectedAccount}
              handleOpen={handleOpen}
              deleteAccount={deleteAccount}
            ></InforList>
          </div>
        </div>
        {/* Button Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          dataLength={infors ? infors.length : 0}
          limit={limit}
        ></Pagination>
      </div>
      <Modal open={open} onClose={handleClose}>
        {selectedAccount ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-12 py-4 bg-white rounded-[8px]">
            <InforForm
              account={selectedAccount}
              onChange={setSelectedAccount}
              handleClose={handleClose}
              updateAccount={updateAccount}
            ></InforForm>
            {/* exit button */}
            <button
              className="absolute right-0 top-0 px-4 py-1 rounded-[4px] hover:bg-red-600 hover:text-white"
              onClick={handleClose}
            >
              <X />
            </button>
          </div>
        ) : (
          <h1>Không có người dùng nào được chọn cả</h1>
        )}
      </Modal>
      <ToastContainer />
    </div>
  );
}
