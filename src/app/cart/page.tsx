import { courses } from "../data";

export default function Cart() {
  return (
    <div className="mt-[40px] flex flex-row gap-[10%]">
      <div className="w-[70%]">
        <h1>Giỏ hàng của tôi</h1>
        <h5>Tổng số khóa học: {courses.length}</h5>
        {courses.map((course, index) => (
          <div key={index} className="flex flex-row border-t">
            <div className="w-[20%] ">Ảnh khóa học</div>
            <div className="w-[40%]">
              {course.name}
              <p>Giảng viên: {course.teacherId}</p>
              <p>
                {course.isBestSeller && (
                  <button className="mr-[4px] p-[4px] rounded-[4px] bg-red-300">
                    Bestseller
                  </button>
                )}
                {course.ratingScore}
                /5 (Lượt đánh giá: {course.reviewCount})
              </p>
              <p>{course.totalDuration} giờ học</p>
              <p>{course.lessionCount} bài học</p>
            </div>
            <div className="w-[20%] flex flex-col items-end justify-evenly">
              <button className="w-fit p-[4px] border rounded-[8px] hover:bg-red-700 hover:text-white">
                Xóa
              </button>
              <button className="w-fit p-[4px] border rounded-[8px] hover:bg-yellow-500">
                Thêm vào yêu thích
              </button>
            </div>
            <div className="w-[20%] ">
              <p className="text-center">{course.price} VNĐ</p>
              <p className="line-through text-center">
                {course.price * 1.2} VNĐ
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[20%] flex flex-col">
        Tạm tính
        <p>1000 VNĐ</p>
        <p>Giảm thêm 81%</p>
        <div>
          <div className="flex">
            <input
              id="promotion-code"
              className="w-[50%]"
              type="text"
              placeholder="Nhập mã khuyến mãi"
            />
            <button className="m-[4px] p-[4px] rounded-[8px] bg-purple-600 text-white">
              Áp dụng
            </button>
          </div>
        </div>
        <p>Mã sinh nhật 20%: 10000VNĐ</p>
        <p>Mã Khách hàng lần đầu 10%: 3000VNĐ</p>
        <p>Mã khách hàng thân thiết 5%: 200VNĐ</p>
        <p>Cần thanh toán: 10000VNĐ</p>
        <button className="m-[4px] p-[12px] rounded-[8px] bg-purple-600 text-white">
          Thanh toán
        </button>
      </div>
    </div>
  );
}
