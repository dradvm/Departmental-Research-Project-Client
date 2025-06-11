import { courses } from "../data";
import { ItemCartType } from "types/itemcart";

function ItemCart({ course }: { course: ItemCartType }) {
  return (
    <div
      key={course.id}
      className="border-b-[4px] border-double border-sky-500"
    >
      <div className="flex flex-row mt-[20px] pb-[4px]">
        {/* Div 1 */}
        <div className="hidden md:block md:w-[20%]">Ảnh khóa học</div>
        {/* Div 2 */}
        <div className="w-[70%] md:w-[60%] lg:w-[40%]">
          <p className="text-[20px] font-bold">{course.name}</p>
          <p className="font-bold text-blue-700">
            Giảng viên: {course.teacherId}
          </p>
          <p>
            {course.isBestSeller && (
              <button className="mr-[4px] p-[4px] rounded-[4px] bg-red-300">
                Bestseller
              </button>
            )}
            {course.ratingScore}
            /5 (Lượt đánh giá: {course.reviewCount})
          </p>
          <div>
            <span>{course.totalDuration} giờ học</span>
            <span className="ml-[4px]">({course.lessionCount} bài học)</span>
          </div>
        </div>
        {/* Div 3 */}
        <div className="hidden lg:w-[20%] lg:flex lg:flex-col items-end justify-evenly">
          <button className="w-fit p-[4px] border rounded-[8px] bg-red-700 text-white">
            Xóa
          </button>
          <button className="w-fit p-[4px] border rounded-[8px] bg-blue-300 text-white">
            Thêm vào yêu thích
          </button>
        </div>
        {/* Div 4 */}
        <div className="w-[30%] md:w-[20%] flex flex-col justify-center">
          <p className="text-center text-[20px] font-bold">
            {course.price} VNĐ
          </p>
          <p className="line-through text-center">{course.price * 1.2} VNĐ</p>
        </div>
      </div>
      {/* Div 3 only for mobile and tablet*/}
      <div className="w-full flex flex-row gap-[4px] justify-end mb-[8px] lg:hidden">
        <button className="w-fit p-[4px] border rounded-[8px] bg-red-700 text-white">
          Xóa
        </button>
        <button className="w-fit p-[4px] border rounded-[8px] bg-blue-300 text-white">
          Thêm vào yêu thích
        </button>
      </div>
    </div>
  );
}

function ProformaInvoice() {
  return (
    <div className="w-full md:w-[60%] mx-auto lg:w-[25%] lg:mx-0 flex flex-col">
      <p className="text-[24px] font-bold">Bảng tạm tính</p>
      <div className="mt-[12px]">
        <p className="text-[18px] font-bold">Tạm tính:</p>
        <p className="text-[18px] font-bold text-blue-500">3 000 000 VNĐ</p>
      </div>
      <div className="flex">
        <input
          id="promotion-code"
          className="flex-1 p-[4px] border-[2px] rounded-[8px]"
          type="text"
          placeholder="Nhập mã của bạn"
        />
        <button className="ml-[4px] p-[4px] rounded-[8px] bg-purple-600 text-white">
          Áp dụng
        </button>
      </div>
      <div className="mt-[12px]">
        <p className="text-[18px] font-bold text-orange-500">
          Ưu đãi riêng cho bạn:
        </p>
        <p className="font-semibold">Giảm 20% vào tháng sinh nhật</p>
        <p className="font-bold text-red-700">-600 000 VNĐ</p>
        <p className="font-semibold">-10% ưu đãi bạn mới</p>
        <p className="font-bold text-red-700">-300 000 VNĐ</p>
        <p className="font-semibold">Thành viên Bạc -5%</p>
        <p className="font-bold text-red-700">-70 000 VNĐ</p>
      </div>
      <div className="mt-[12px]">
        <p className="text-[18px] font-bold underline decoration-double">
          Cần thanh toán:
        </p>
        <p className="text-[28px] font-bold text-blue-500">1 000 000 VNĐ</p>
      </div>
      <button className="m-[4px] p-[12px] rounded-[8px] bg-purple-600 text-white">
        Thanh toán
      </button>
    </div>
  );
}

export default function Cart() {
  return (
    <div className="mt-[40px] flex flex-col lg:flex-row lg:gap-[5%]">
      <div className="w-full lg:w-[70%]">
        <h1 className="text-[24px] font-bold">Giỏ hàng của tôi</h1>
        <h5 className="font-bold">Tổng số khóa học: {courses.length}</h5>
        {courses.map((course, index) => (
          <ItemCart key={index} course={course}></ItemCart>
        ))}
      </div>
      <ProformaInvoice></ProformaInvoice>
    </div>
  );
}
