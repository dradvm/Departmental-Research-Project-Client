import { CouponBody } from "types/coupon";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import couponService from "services/coupon.service";
import withRole from "components/WithRole/withRole";

const schema: yup.ObjectSchema<CouponBody> = yup.object({
  isGlobal: yup.boolean().default(true),
  couponId: yup.number().optional(),
  type: yup
    .mixed<"discount" | "voucher">()
    .required("Vui lòng chọn Loại khuyến mãi")
    .test(
      "check-type",
      "Loại mã chưa hợp lệ với giá trị",
      function (typeInput) {
        const { value } = this.parent;

        if (!value) return true;

        if (typeInput === "discount") return value > 0 && value <= 100;
        if (typeInput === "voucher") return value > 0;

        return true;
      }
    ),
  value: yup
    .number()
    .typeError("Giá trị khuyến mãi là số")
    .required("Vui lòng nhập Giá trị khuyến mãi")
    .test("check-value", "Giá trị không hợp lệ", function (valueInput) {
      const { type } = this.parent;

      if (type === "discount") return valueInput > 0 && valueInput <= 100;
      if (type === "voucher") return valueInput > 0;

      return true;
    }),
  code: yup
    .string()
    .min(3, "Mã khuyến mãi ít nhất 3 ký tự")
    .max(10, "Mã khuyến mãi tối đa 10 ký tự")
    .required("Vui lòng nhập Mã khuyến mãi")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Mã khuyến mãi chỉ được phép chứa chữ cái tiếng Anh hoặc số"
    ),
  maxValueDiscount: yup
    .number()
    .required("Vui lòng nhập số tiền Giảm tối đa")
    .typeError("Giảm tối đa phải là số"),
  minRequire: yup
    .number()
    .typeError("Đơn hàng tối thiểu phải là số")
    .min(0)
    .required("Vui lòng nhập giá trị đơn tối thiểu"),
  quantity: yup
    .number()
    .typeError("Số lượng tối đa phải là số")
    .min(1, "Số lượng tối đa phải lớn hơn 0")
    .required("Vui lòng nhập số lượng tối đa")
    .test(
      "check-quantity",
      "Số lượng tối đa phải lớn hơn số lượng đã áp dụng",
      function (quantityInput) {
        const { appliedAmount } = this.parent;
        if (!appliedAmount) return true;

        return appliedAmount <= quantityInput;
      }
    ),
  startDate: yup
    .string()
    .required("Vui lòng chọn ngày bắt đầu")
    .test(
      "check-startDate",
      "Ngày bắt đầu phải trước ngày kết thúc",
      function (startDateInput) {
        const { endDate } = this.parent;
        if (!endDate) return true;
        return new Date(startDateInput) < new Date(endDate);
      }
    ),
  endDate: yup
    .string()
    .required("Vui lòng chọn ngày kết thúc")
    .test(
      "check-endDate",
      "Ngày kết thúc phải sau ngày bắt đầu",
      function (endDateInput) {
        const { startDate } = this.parent;
        if (!startDate) return true;
        return new Date(startDate) < new Date(endDateInput);
      }
    ),
});

function PromotionForm({
  promotion,
  setPromotionInfor,
  handleSuccessfulCreation,
  handleFailedCreation,
  handleInformIsExistingCode,
  isGlobal,
}: {
  promotion: CouponBody;
  setPromotionInfor: (acc: CouponBody) => void;
  handleSuccessfulCreation: () => void;
  handleFailedCreation: () => void;
  handleInformIsExistingCode: () => void;
  isGlobal: boolean;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CouponBody>({
    defaultValues: promotion,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setPromotionInfor(value as CouponBody);
    });
    return () => subscription.unsubscribe();
  }, [watch, setPromotionInfor]);

  const onSubmit: SubmitHandler<CouponBody> = async (data) => {
    try {
      const isExistingCode: boolean = (
        await couponService.checkIsExistingCode(data.code)
      ).data;
      if (isExistingCode) handleInformIsExistingCode();
      else {
        data.startDate = new Date(data.startDate).toISOString();
        data.endDate = new Date(data.endDate).toISOString();
        if (!isGlobal) data.isGlobal = false;
        await couponService.createCoupon(data);
        handleSuccessfulCreation();
        await new Promise((resolve) => setTimeout(resolve, 3000));
        router.push("/admin/promotion/global");
      }
    } catch (e) {
      handleFailedCreation();
      console.log("Lỗi khi tạo global coupon", e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="pb-4">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Thông tin mã khuyến mãi
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="type"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Loại khuyến mãi
              </label>
              <div className="mt-2">
                <select
                  id="type"
                  {...register("type")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value={"discount"}>DISCOUNT</option>
                  <option value={"voucher"}>VOUCHER</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="value"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Giá trị khuyến mãi
              </label>
              <div className="mt-2">
                <input
                  id="value"
                  type="text"
                  {...register("value")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.value && (
                  <p className="text-red-500 text-sm">{errors.value.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="code"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Mã khuyến mãi
              </label>
              <div className="mt-2">
                <input
                  id="code"
                  type="text"
                  {...register("code")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm">{errors.code.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="quantity"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Số lượng tối đa
              </label>
              <div className="mt-2">
                <input
                  id="quantity"
                  type="number"
                  min={0}
                  max={1000000}
                  {...register("quantity")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="maxValueDiscount"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Giảm tối đa (VNĐ)
              </label>
              <div className="mt-2">
                <input
                  id="maxValueDiscount"
                  type="number"
                  min={0}
                  max={10000000}
                  {...register("maxValueDiscount")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.maxValueDiscount && (
                  <p className="text-red-500 text-sm">
                    {errors.maxValueDiscount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="minRequire"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Áp dụng cho đơn từ (VNĐ)
              </label>
              <div className="mt-2">
                <input
                  id="minRequire"
                  type="number"
                  min={0}
                  max={10000000}
                  {...register("minRequire")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.minRequire && (
                  <p className="text-red-500 text-sm">
                    {errors.minRequire.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="startDate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Bắt đầu từ:
              </label>
              <div className="mt-2">
                <input
                  id="startDate"
                  type="date"
                  {...register("startDate")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="endDate"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Diễn ra cho đến
              </label>
              <div className="mt-2">
                <input
                  id="endDate"
                  type="date"
                  {...register("endDate")}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
          onClick={() => {
            if (confirm(`Chưa lưu thay đổi. Vẫn muốn quay lại???`)) {
              router.push("/admin/promotion/global");
            }
          }}
        >
          Hủy
        </button>
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Lưu
        </button>
      </div>
    </form>
  );
}

export default withRole(PromotionForm, ["ADMIN"]);