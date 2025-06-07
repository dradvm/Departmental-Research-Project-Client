import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Stack } from "@mui/material";
import { Button } from "components/Button/Button";
import { CircleAlert, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CourseOverview() {
  return (
    <Stack className="space-y-4">
      <div className="text-2xl">
        Tự động hóa quy trình làm việc dễ dàng với n8n – Khóa học vỡ lòng cho
        người mới bắt đầu
      </div>
      <div className="flex space-x-5">
        <Stack>
          <div className="flex items-center font-bold text-yellow-700">
            4.8
            <FontAwesomeIcon icon={faStar} className="text-yellow-600 ms-1" />
          </div>
          <div className="text-xs text-gray-500">374 ratings</div>
        </Stack>
        <Stack>
          <div className="font-bold">7,905</div>
          <div className="text-xs text-gray-500">Students</div>
        </Stack>
        <Stack>
          <div className="font-bold">5 hours</div>
          <div className="text-xs text-gray-500">Total</div>
        </Stack>
      </div>
      <div className="flex items-center text-sm">
        <CircleAlert size={16} strokeWidth={1} className="me-2 text-gray-600" />
        Last update 2025
      </div>
      <div className="flex items-center text-sm">
        <Globe size={16} strokeWidth={1} className="me-2 text-gray-600" />
        Vietnamese
      </div>
      <Divider />
      <div className="grid grid-cols-3 gap-4">
        <div>Qua các con số</div>
        <div className="col-span-2 grid grid-cols-2">
          <Stack>
            <div>Trình độ: All Levels</div>
            <div>Học viên: 7907</div>
            <div>Ngôn ngữ: Vietnamese</div>
            <div>Phụ đề: No</div>
          </Stack>
          <Stack>
            <div>Số bài giảng: 58</div>
            <div>Tổng thời lượng: 5 hours</div>
          </Stack>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-3 gap-4">
        <div>Chứng nhận</div>
        <div className="col-span-2">
          <Stack>
            <div>
              Nhận chứng chỉ khoá học bằng cách hoàn thành toàn bộ khoá học
            </div>
            <div className="mt-3">
              <Button variant="primary" expand={true} disabled={true}>
                Chứng chỉ khoá học
              </Button>
            </div>
          </Stack>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-3 gap-4">
        <div>Mô tả</div>
        <div className="col-span-2">
          Bạn muốn tự động hóa công việc nhưng không biết lập trình? Bạn đang
          tìm kiếm một công cụ giúp tối ưu quy trình làm việc một cách dễ dàng?
          Khóa học Vỡ lòng về Automation với n8n sẽ giúp bạn làm chủ n8n – một
          nền tảng tự động hóa mạnh mẽ, dễ sử dụng và hoàn toàn miễn phí. Trong
          khóa học này, bạn sẽ: - Hiểu rõ khái niệm về automation và cách hoạt
          động của n8n - Biết cách tạo và quản lý workflow tự động từ đơn giản
          đến nâng cao - Kết nối n8n với các ứng dụng phổ biến như Google
          Sheets, Slack, Email, API… - Ứng dụng n8n vào thực tế để tối ưu công
          việc và nâng cao hiệu suất - Tiết kiệm thời gian bằng cách tự động hóa
          các tác vụ lặp đi lặp lại - Không cần biết lập trình vẫn có thể tạo
          workflow mạnh mẽ Dù bạn là người mới bắt đầu, nhà quản lý, marketer
          hay lập trình viên, khóa học này sẽ giúp bạn tự động hóa dễ dàng mà
          không cần code phức tạp. Với phương pháp giảng dạy trực quan, bài tập
          thực hành thực tế và hướng dẫn từng bước, bạn sẽ nhanh chóng nắm vững
          cách sử dụng n8n để cải thiện công việc hàng ngày. Tham gia ngay để
          khám phá sức mạnh của n8n và biến công việc của bạn trở nên nhẹ nhàng
          hơn! What you’ll learn Hiểu rõ cách hoạt động của n8n – Nắm vững các
          khái niệm cơ bản về automation, workflow và cách sử dụng n8n để tự
          động hóa công việc. Xây dựng quy trình tự động hóa – Biết cách tạo,
          chỉnh sửa và triển khai các workflow tự động hóa giúp tối ưu công việc
          hàng ngày. Kết nối và tích hợp ứng dụng – Thành thạo cách sử dụng n8n
          để kết nối nhiều ứng dụng (Google Sheets, Slack, Email, API…) mà không
          cần viết code. Ứng dụng thực tế vào công việc – Có thể tự động hóa các
          tác vụ cá nhân hoặc trong doanh nghiệp, giúp tiết kiệm thời gian và
          nâng cao hiệu suất làm việc. Are there any course requirements or
          prerequisites? Không yêu cầu trình độ trước. Who this course is for:
          Người mới bắt đầu với Automation – Những ai chưa có kinh nghiệm về tự
          động hóa và muốn tìm hiểu cách sử dụng n8n để tối ưu quy trình làm
          việc. Nhà quản lý và doanh nghiệp – Những người muốn tự động hóa công
          việc lặp lại, giảm thời gian xử lý thủ công và nâng cao hiệu suất làm
          việc. Marketer & Chuyên viên vận hành – Những ai cần kết nối các công
          cụ marketing, CRM, email hoặc quản lý dữ liệu mà không cần lập trình.
          Lập trình viên & Chuyên viên IT – Những người muốn sử dụng n8n để tích
          hợp API, xây dựng quy trình tự động phức tạp và tối ưu hóa hệ thống.
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-3 gap-4">
        <div>Giảng viên</div>
        <Stack className="col-span-2 gap-7">
          <Stack className="gap-3">
            <div className="flex items-center space-x-5">
              <div className="rounded-full w-16 h-16 overflow-hidden">
                <Image src="/test.jpg" alt="image" width={64} height={64} />
              </div>
              <Stack>
                <div className="font-semibold">Duy Nguyen</div>
                <div className="text-sm text-slate-700 font-medium">
                  Nhà sáng lập Edu Market
                </div>
              </Stack>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <Link
                href="https://www.facebook.com/duy.nguyen.606353/"
                className="flex items-center justify-around text-white bg-gray-500 hover:bg-black"
                style={{
                  padding: 6,
                }}
              >
                <Globe size={20} strokeWidth={1} />
              </Link>
              <Link
                href="https://www.facebook.com/duy.nguyen.606353/"
                className="flex items-center justify-around text-white bg-gray-500 hover:bg-black"
                style={{
                  padding: 6,
                }}
              >
                <Globe size={20} strokeWidth={1} />
              </Link>
              <Link
                href="https://www.facebook.com/duy.nguyen.606353/"
                className="flex items-center justify-around text-white bg-gray-500 hover:bg-black"
                style={{
                  padding: 6,
                }}
              >
                <Globe size={20} strokeWidth={1} />
              </Link>
            </div>
          </Stack>
          <div>
            Chuyên gia công nghệ trong lĩnh vực tài chính, ngân hàng với 18 năm
            kinh nghiệm trong việc xây dựng, phát triển và quản trị các hệ thống
            phần mềm cho nhiều ngân hàng và công ty fintech tại Việt Nam.
          </div>
        </Stack>
      </div>
    </Stack>
  );
}
