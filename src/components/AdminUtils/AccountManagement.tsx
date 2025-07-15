"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { UserType, UserReq, UserDB } from "types/user";
import { Search, X } from "lucide-react";
import { userService } from "services/user.service";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import InforList from "./InforList";
import InforForm from "./InforForm";
import { Pagination } from "./Pagination";

export default function AccountManagement({
  type,
}: Readonly<{ type: "USERS" | "INSTRUCTOR" }>) {
  const [page, setPage] = useState<number>(1);
  const [dataLen, setDataLen] = useState<number>(0);
  const [infors, setInfors] = useState<UserType[]>();
  const [selectedAccount, setSelectedAccount] = useState<UserType>();
  const [open, setOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState({
    searchText: undefined,
  });

  const limit = 5;

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function onChangeFilterInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPage(1);
    setFilter((preFilter) => ({
      ...preFilter,
      [name]: value,
    }));
  }

  async function fetchData(
    page: number,
    filter: { searchText?: string },
    type: "USERS" | "INSTRUCTOR"
  ) {
    const skip = (page - 1) * limit;
    const params: UserReq = {
      limit,
      skip,
      role: type === "USERS" ? "USERS" : "INSTRUCTOR",
      searchText: filter.searchText,
    };
    try {
      const dataDB: UserDB = (await userService.getAllUser(params)).data.data;
      setDataLen(dataDB.length);
      setInfors(dataDB.users);
    } catch (e) {
      toast.error("Có lỗi khi lấy dữ liệu người dùng!");
      console.error("Lỗi lấy dữ liệu người dùng: ", e);
      setInfors([]);
    }
  }

  useEffect(() => {
    fetchData(page, filter, type);
  }, [page, filter, type]);

  async function deleteAccount(userId: number) {
    if (confirm(`Xác nhận vô hiệu hóa tài khoản này?`))
      try {
        await userService.deleteAccount(userId);
        toast.success("Vô hiệu hóa tài khoản thành công!", { autoClose: 3000 });
        await fetchData(page, filter, type);
      } catch (e) {
        toast.error("Có lỗi khi vô hiệu hóa tài khoản!", { autoClose: 3000 });
        console.error("Lỗi khi vô hiệu hóa tài khoản người dùng: ", e);
      }
  }

  async function enableAccount(userId: number) {
    if (confirm(`Xác nhận hủy vô hiệu hóa tài khoản này?`))
      try {
        console.log("yêu hủy vô hiệu hóa tk của id: ", userId);
        await userService.enableAccount(userId);
        toast.success("Hủy vô hiệu hóa tài khoản thành công!", {
          autoClose: 3000,
        });
        await fetchData(page, filter, type);
      } catch (e) {
        toast.error("Có lỗi khi hủy vô hiệu hóa tài khoản!", {
          autoClose: 3000,
        });
        console.error("Lỗi khi hủy vô hiệu hóa tài khoản người dùng: ", e);
      }
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Filter Input */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          mb: 2,
        }}
      >
        <Search size={20} className="text-slate-700" />
        <input
          type="text"
          placeholder="Tìm người dùng"
          name="searchText"
          value={filter.searchText ?? ""}
          onChange={onChangeFilterInput}
          className="grow rounded-full px-4 py-2 border border-gray-300 placeholder:text-slate-700 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </Box>

      {/* Infor List */}
      <Box mb={3}>
        <InforList
          infors={infors}
          setSelectedItem={setSelectedAccount}
          handleOpen={handleOpen}
          deleteAccount={deleteAccount}
          enableAccount={enableAccount}
        />
      </Box>

      {/* Pagination */}
      <div className="flex items-center justify-around">
        <Pagination
          page={page}
          setPage={setPage}
          dataLength={dataLen}
          limit={limit}
        />
      </div>

      {/* Modal for Account Update */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <X />
          </IconButton>

          {selectedAccount ? (
            <InforForm account={selectedAccount} />
          ) : (
            <Typography variant="h6">
              Không có người dùng nào được chọn cả
            </Typography>
          )}
        </Box>
      </Modal>

      <ToastContainer />
    </Box>
  );
}
