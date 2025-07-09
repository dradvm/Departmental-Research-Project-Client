"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { UserType, UserUpdateBody, UserReq } from "types/user";
import { Search, X } from "lucide-react";
import { userService } from "services/user.service";
import { Box, Modal, Typography, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import InforList from "./InforList";
import InforForm from "./InforForm";
import { Pagination } from "./Pagination";

export default function AccountManagement({
  type,
}: Readonly<{ type: "USER" }>) {
  const [page, setPage] = useState<number>(1);
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
    type: "USER"
  ) {
    const skip = (page - 1) * limit;
    const params: UserReq = {
      limit,
      skip,
      role: type === "USER" ? "USERS" : "USERS",
      searchText: filter.searchText,
    };
    try {
      const dataDB: UserType[] = (await userService.getAllUser(params)).data
        .data;
      setInfors(dataDB);
    } catch (e) {
      toast.error("Có lỗi khi lấy dữ liệu người dùng!");
      console.error("Lỗi lấy dữ liệu người dùng: ", e);
      setInfors([]);
    }
  }

  useEffect(() => {
    fetchData(page, filter, type);
  }, [page, filter, type]);

  async function updateAccount(
    userId: number,
    name?: string,
    biography?: string,
    img?: string
  ) {
    try {
      const bodyReq: UserUpdateBody = { id: userId, name, biography, img };
      await userService.updateAccount(bodyReq);
      toast.success("Cập nhật tài khoản thành công!");
      handleClose();
      fetchData(page, filter, type);
    } catch (e) {
      toast.error("Lỗi xảy ra khi cập nhật tài khoản!");
      console.error("Lỗi xảy ra khi cập nhật tài khoản: ", e);
    }
  }

  async function deleteAccount(userId: number) {
    if (confirm(`Xác nhận xóa tài khoản này?`))
      try {
        await userService.deleteAccount(userId);
        toast.success("Xóa tài khoản thành công!", { autoClose: 3000 });
        await fetchData(page, filter, type);
      } catch (e) {
        toast.error("Có lỗi khi xóa tài khoản!", { autoClose: 3000 });
        console.error("Lỗi khi xóa tài khoản người dùng: ", e);
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
        />
      </Box>

      {/* Pagination */}
      <div className="flex items-center justify-around">
        <Pagination
          page={page}
          setPage={setPage}
          dataLength={infors ? infors.length : 0}
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
            <InforForm
              account={selectedAccount}
              onChange={setSelectedAccount}
              handleClose={handleClose}
              updateAccount={updateAccount}
            />
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
