import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import withRole from "components/WithRole/withRole";
import { GlobalCouponType } from "types/coupon";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface GlobalCouponTableProps {
  globalCoupons: GlobalCouponType[];
  setSelectedCoupon: React.Dispatch<
    React.SetStateAction<GlobalCouponType | undefined>
  >;
  handleOpen: () => void;
}

function GlobalCouponTable(props: GlobalCouponTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Mã khuyến mãi</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Hình thức
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Giá trị
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Bắt đầu
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Kết thúc
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Lượt áp dụng
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Xem chi tiết
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.globalCoupons.map((gCoupon) => {
            return (
              <TableRow key={gCoupon.couponId}>
                <TableCell>{gCoupon.code}</TableCell>
                <TableCell align="center">
                  {gCoupon.type.toUpperCase()}
                </TableCell>
                <TableCell align="right">
                  {gCoupon.type === "discount"
                    ? `${gCoupon.value}%`
                    : `${formatVND(parseInt(gCoupon.value))}`}
                </TableCell>
                <TableCell align="right">
                  {getDateFormat(gCoupon.startDate)}
                </TableCell>
                <TableCell align="right">
                  {getDateFormat(gCoupon.endDate)}
                </TableCell>
                <TableCell align="right">
                  {gCoupon.appliedAmount}/ {gCoupon.quantity}
                </TableCell>
                <TableCell align="right">
                  <button
                    className="px-2 py-1 rounded-[4px] bg-purple-700 text-white"
                    onClick={() => {
                      props.setSelectedCoupon(gCoupon);
                      props.handleOpen();
                    }}
                  >
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

export default withRole(GlobalCouponTable, ["ADMIN"]);