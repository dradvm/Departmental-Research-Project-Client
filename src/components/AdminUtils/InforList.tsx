import { UserType } from "types/user";
import NoDataFound from "./NoDataFound";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface InforListProps {
  infors: UserType[] | undefined;
  setSelectedItem: (account: UserType) => void;
  handleOpen: () => void;
  deleteAccount: (userId: number) => void;
}

export default function InforList({
  infors,
  setSelectedItem,
  handleOpen,
  deleteAccount,
}: InforListProps) {
  return (
    <div>
      {!infors || infors.length === 0 ? (
        <NoDataFound message="Danh sách người dùng trống"></NoDataFound>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Họ và tên</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Giới tính</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Địa chỉ email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Trạng thái tài khoản
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {infors.map((infor) => {
                return (
                  <TableRow key={infor.userId}>
                    <TableCell>{infor.name}</TableCell>
                    <TableCell>{infor.gender}</TableCell>
                    <TableCell>{infor.email}</TableCell>
                    {infor.isActive ? (
                      <TableCell>Đã kích hoạt</TableCell>
                    ) : (
                      <TableCell sx={{ color: "red" }}>
                        Chưa kích hoạt
                      </TableCell>
                    )}
                    <TableCell>
                      <button
                        className="px-2 py-1 rounded-[8px] bg-red-500 text-white"
                        onClick={() => {
                          deleteAccount(infor.userId);
                        }}
                      >
                        Xóa tài khoản
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        className="px-2 py-1 rounded-[8px] bg-purple-500 text-white"
                        onClick={() => {
                          setSelectedItem(infor);
                          handleOpen();
                        }}
                      >
                        Xem & Cập nhật
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
