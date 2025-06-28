import { ItemType } from "types/cart";
import { formatVND } from "utils/money";

export default function ItemCart({
  item,
  onDelete,
}: {
  item: ItemType;
  onDelete: (courseId: number, titleCourse: string) => void;
}) {
  return (
    <div className="border-b-[4px] border-double border-sky-500">
      <div className="flex flex-row mt-[20px] pb-[4px]">
        {/* Div 1 */}
        <div className="hidden md:block md:w-[20%]">Ảnh khóa học</div>
        {/* Div 2 */}
        <div className="w-[70%] md:w-[60%] lg:w-[40%]">
          <p className="text-[20px] font-bold">{item.course.title}</p>
          <p className="font-bold text-blue-700">
            Giảng viên: {item.teacher.userName}
          </p>
          <p>3/5 (Lượt đánh giá: 300)</p>
          <div>
            <span>10 giờ học</span>
            <span className="ml-[4px]">(90 bài học)</span>
          </div>
        </div>
        {/* Div 3 */}
        <div className="hidden lg:w-[20%] lg:flex lg:flex-col items-end justify-evenly">
          <button
            className="w-fit p-[4px] border rounded-[8px] bg-red-700 text-white"
            onClick={() =>
              onDelete(parseInt(item.course.courseId), item.course.title)
            }
          >
            Xóa
          </button>
          <button className="w-fit p-[4px] border rounded-[8px] bg-blue-300 text-white">
            Thêm vào yêu thích
          </button>
        </div>
        {/* Div 4 */}
        <div className="w-[30%] md:w-[20%] flex flex-col justify-center">
          <p className="text-center text-[20px] font-bold">
            {formatVND(parseInt(item.course.final_price))}
          </p>
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
