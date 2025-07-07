import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NormalCouponType } from "types/coupon";
import { getDateFormat } from "utils/date-format";
import { formatVND } from "utils/money";

interface NormalCouponTableProps {
  normalCoupons: NormalCouponType[];
  setSelectedCoupon: React.Dispatch<
    React.SetStateAction<NormalCouponType | undefined>
  >;
  handleOpen: () => void;
  acceptACouponCourse: (couponId: number, courseId: number) => void;
  deactivateCouponCourse: (couponId: number, courseId: number) => void;
  acceptAndActivateCouponCourse: (couponId: number, courseId: number) => void;
}

export default function NormalCouponTable(props: NormalCouponTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Mã khuyến mãi</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Khóa học</TableCell>
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
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.normalCoupons.map((nCoupon, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{nCoupon.code}</TableCell>
                <TableCell>{nCoupon.coureTitle}</TableCell>
                <TableCell align="right">
                  {nCoupon.type === "discount"
                    ? `${nCoupon.value}%`
                    : `${formatVND(parseInt(nCoupon.value))}`}
                </TableCell>
                <TableCell align="right">
                  {getDateFormat(nCoupon.startDate)}
                </TableCell>
                <TableCell align="right">
                  {getDateFormat(nCoupon.endDate)}
                </TableCell>
                <TableCell align="right">
                  {nCoupon.appliedAmount}/ {nCoupon.quantity}
                </TableCell>
                <TableCell align="right">
                  <button
                    className="px-2 py-1 rounded-[4px] bg-purple-700 text-white"
                    onClick={() => {
                      props.setSelectedCoupon(nCoupon);
                      props.handleOpen();
                    }}
                  >
                    Xem chi tiết
                  </button>
                </TableCell>
                <TableCell>
                  {!nCoupon.isAccepted && !nCoupon.isRunning && (
                    <button
                      className="px-2 py-1 bg-blue-700 rounded-[4px] text-white"
                      title="Duyệt và kích hoạt ngay mã khuyến mãi cho khóa học"
                      onClick={() =>
                        props.acceptAndActivateCouponCourse(
                          nCoupon.couponId,
                          nCoupon.courseId
                        )
                      }
                    >
                      Kích hoạt ngay
                    </button>
                  )}
                  {!nCoupon.isAccepted && !nCoupon.isRunning && (
                    <button
                      className="px-2 py-1 ml-4 bg-green-700 rounded-[4px] text-white"
                      title="Duyệt mã khuyến mãi này, nhưng chưa kích hoạt cho khóa học"
                      onClick={() =>
                        props.acceptACouponCourse(
                          nCoupon.couponId,
                          nCoupon.courseId
                        )
                      }
                    >
                      Duyệt ngay
                    </button>
                  )}
                  {/* case 2: accepted and running */}
                  {nCoupon.isAccepted && nCoupon.isRunning && (
                    <button
                      className="px-2 py-1 bg-red-700 rounded-[4px] text-white"
                      title="Hủy kích hoạt mã khuyến mãi cho khóa học này, có thể kích hoạt lại sau"
                      onClick={() =>
                        props.deactivateCouponCourse(
                          nCoupon.couponId,
                          nCoupon.courseId
                        )
                      }
                    >
                      Hủy kích hoạt
                    </button>
                  )}
                  {/* case 3: accepted but not running */}
                  {nCoupon.isAccepted && !nCoupon.isRunning && (
                    <button
                      className="px-2 py-1 bg-blue-700 rounded-[4px] text-white"
                      title="Mã này đã duyệt, kích hoạt để hiệu lực với khóa học này"
                      onClick={() =>
                        props.acceptAndActivateCouponCourse(
                          nCoupon.couponId,
                          nCoupon.courseId
                        )
                      }
                    >
                      Kích hoạt ngay
                    </button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
