import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PaymentType } from "types/payment";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface PaymentTableProps {
  payments: PaymentType[];
  setSelectedPayment: React.Dispatch<
    React.SetStateAction<PaymentType | undefined>
  >;
  handleOpen: () => void;
}

export default function PaymentTable(props: PaymentTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} align="left">
              Khách hàng
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Ngày lập hóa đơn
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Số lượng khóa học
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Tổng tiền
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.payments.map((payment) => {
            return (
              <TableRow key={payment.paymentId} className="hover:bg-gray-200">
                <TableCell align="left">{payment.userName}</TableCell>
                <TableCell align="right">
                  {getDateFormat(payment.timePayment)}
                </TableCell>
                <TableCell align="center">
                  {payment.paymentDetail.length}
                </TableCell>
                <TableCell align="right">
                  {formatVND(parseInt(payment.finalPrice))}
                </TableCell>
                <TableCell
                  align="right"
                  onClick={() => {
                    props.setSelectedPayment(payment);
                    props.handleOpen();
                  }}
                >
                  <button className="px-2 py-1 rounded-[4px] bg-purple-700 text-white">
                    Xem chi tiết
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
