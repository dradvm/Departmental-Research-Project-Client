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
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { Button } from "components/Button/Button";
import withRole from "components/WithRole/withRole";

interface InforListProps {
  infors: UserType[] | undefined;
  setSelectedItem: (account: UserType) => void;
  handleOpen: () => void;
  deleteAccount: (userId: number) => void;
  enableAccount: (userId: number) => void;
}

function InforList({
  infors,
  setSelectedItem,
  handleOpen,
  deleteAccount,
  enableAccount,
}: InforListProps) {
  return (
    <>
      {!infors || infors.length === 0 ? (
        <NoDataFound message="Danh sách người dùng trống" />
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Họ và tên</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Giới tính
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Trạng thái
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Hành động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {infors.map((infor) => (
                <TableRow key={infor.userId} hover>
                  <TableCell>
                    <Typography>{infor.name}</Typography>
                  </TableCell>

                  {/* Giới tính dưới dạng Chip */}
                  <TableCell align="center">
                    <Chip
                      label={
                        infor.gender === "male"
                          ? "Nam"
                          : infor.gender === "female"
                            ? "Nữ"
                            : "Khác"
                      }
                      color={
                        infor.gender === "male"
                          ? "info"
                          : infor.gender === "female"
                            ? "secondary"
                            : "default"
                      }
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography>{infor.email}</Typography>
                  </TableCell>

                  {/* Trạng thái tài khoản dưới dạng Chip */}
                  <TableCell align="center">
                    {!infor.isDeleted && (
                      <Chip
                        label={
                          infor.isActive ? "Đã kích hoạt" : "Chưa kích hoạt"
                        }
                        color={infor.isActive ? "success" : "error"}
                        variant="outlined"
                      />
                    )}
                    {infor.isDeleted && (
                      <Chip
                        label={"Bị vô hiệu hóa"}
                        color={"error"}
                        variant="outlined"
                      />
                    )}
                  </TableCell>

                  {/* Hành động gộp chung cột */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Button
                        variant="filled"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(infor);
                          handleOpen();
                        }}
                      >
                        Xem chi tiết
                      </Button>
                      {infor.isDeleted && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => enableAccount(infor.userId)}
                        >
                          Hủy vô hiệu hóa
                        </Button>
                      )}
                      {!infor.isDeleted && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => deleteAccount(infor.userId)}
                        >
                          Vô hiệu hóa
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default withRole(InforList, ["ADMIN"]);