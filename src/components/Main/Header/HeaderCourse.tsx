import { Button } from "components/Button/Button";
import CircularIndeterminate from "components/CircularIndeterminate/CircularIndeterminate";

import { ChevronDown, EllipsisVertical, Share2, Star } from "lucide-react";

export default function HeaderCourse() {
  return (
    <header className="h-14 bg-gray-950 w-full flex items-center justify-between px-4 text-white border-b border-slate-700">
      <div className="flex items-center">
        <div>UDEMY</div>
        <div className="h-5 bg-gray-500 mx-5" style={{ width: "1px" }}></div>
        <div className="font-medium">Khoá học vỡ lòng với n8n</div>
      </div>
      <div className="flex items-center space-x-3">
        <Button>
          <Star size={14} className="me-1" /> Để lại đánh giá
        </Button>
        <Button variant="hover">
          <CircularIndeterminate progress={50} />
          <div className="ms-1">Tiến độ của bạn</div>
          <ChevronDown size={14} strokeWidth={2} className="ms-1 mt-1" />
        </Button>
        <Button variant="outline">
          Chia sẻ <Share2 className="ms-2" size={14} strokeWidth={1} />
        </Button>
        <Button variant="outline">
          <EllipsisVertical size={20} strokeWidth={1} />
        </Button>
      </div>
    </header>
  );
}
