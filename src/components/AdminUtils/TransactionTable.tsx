import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button } from "components/Button/Button";
import withRole from "components/WithRole/withRole";
import { PaymentType } from "types/payment";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface TransactionTableProps {
  payments: PaymentType[];
  setSelectedPayment: React.Dispatch<
    React.SetStateAction<PaymentType | undefined>
  >;
  handleOpen: () => void;
}

function TransactionTable(props: TransactionTableProps) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Ngày mua
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Số lượng khóa học
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Tổng tiền
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Hành động
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.payments.map((payment) => (
            <TableRow
              key={payment.paymentId}
              sx={{
                "&:hover": { backgroundColor: "#f3f4f6" }, // hover:bg-gray-100
              }}
            >
              <TableCell align="center">
                {getDateFormat(payment.timePayment)}
              </TableCell>
              <TableCell align="center">
                {payment.paymentDetail.length}
              </TableCell>
              <TableCell align="center">
                {formatVND(parseInt(payment.finalPrice))}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="filled"
                  size="sm"
                  onClick={() => {
                    props.setSelectedPayment(payment);
                    props.handleOpen();
                  }}
                >
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withRole(TransactionTable, ["ADMIN"]);