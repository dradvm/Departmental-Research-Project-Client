import { ReportType } from "types/report";
import { PostType } from "types/post";

export const reports: Array<ReportType> = [
  {
    idReport: 1,
    contentReport: "Khóa học không có phụ đề tiếng Việt như đã mô tả.",
    idUser: 1023,
    name: "Nguyễn Văn An",
  },
  {
    idReport: 2,
    contentReport:
      "Chất lượng video mờ, khó xem rõ nội dung giảng viên trình bày.",
    idUser: 1078,
    name: "Trần Thị Bích Ngọc",
  },
  {
    idReport: 3,
    contentReport:
      "Nội dung khóa học không đúng với tiêu đề và mô tả khóa học.",
    idUser: 1150,
    name: "Phạm Minh Tuấn",
  },
  {
    idReport: 4,
    contentReport: "Giảng viên không phản hồi câu hỏi trong phần thảo luận.",
    idUser: 1099,
    name: "Lê Thị Kim Chi",
  },
  {
    idReport: 5,
    contentReport:
      "Phát hiện nội dung sao chép từ khóa học khác, không phải bản gốc.",
    idUser: 1042,
    name: "Đỗ Mạnh Hùng",
  },
  {
    idReport: 6,
    contentReport:
      "Khóa học được giới thiệu là dành cho người mới bắt đầu, nhưng nội dung lại quá nâng cao. Không có hướng dẫn cụ thể để làm theo từng bước. Một số phần giảng viên nói quá nhanh, khó nắm bắt. Không có bài tập thực hành sau mỗi chương. Slide trình chiếu cũng không đồng bộ với nội dung giảng dạy. Cần cải thiện phần minh họa ví dụ để người học dễ hiểu hơn. Ngoài ra, phụ đề tự động sai nhiều, gây nhầm lẫn.",
    idUser: 1011,
    name: "Võ Thị Lan Hương",
  },
  {
    idReport: 7,
    contentReport:
      "Trong quá trình học, tôi phát hiện nhiều video không thể phát hoặc bị lỗi. Giảng viên không cập nhật bài học mới dù đã hứa hẹn. Nội dung trong video không đồng nhất, có đoạn lặp lại. Hệ thống không ghi nhớ tiến trình học, khiến tôi phải xem lại từ đầu. Bài kiểm tra cuối khóa không phản ánh đúng nội dung đã học. Cần bổ sung thêm tài liệu PDF hoặc bài đọc kèm theo. Hỗ trợ kỹ thuật phản hồi chậm.",
    idUser: 1184,
    name: "Ngô Thanh Phong",
  },
  {
    idReport: 8,
    contentReport:
      "Giảng viên phát âm không rõ ràng, khó nghe. Một số bài giảng quá ngắn và không có chiều sâu. Không có hướng dẫn chi tiết để thực hành. Nội dung bị trùng lặp với nhiều khóa học khác trên nền tảng. Thời gian phản hồi của giảng viên quá lâu. Cần cải thiện chất lượng âm thanh. Nhiều câu hỏi trong bài quiz bị lỗi định dạng.",
    idUser: 1133,
    name: "Bùi Thị Thu Trang",
  },
  {
    idReport: 9,
    contentReport: "Không thể tải tài liệu đính kèm trong bài học.",
    idUser: 1039,
    name: "Nguyễn Minh Nhật",
  },
  {
    idReport: 10,
    contentReport: "Khóa học không có phần bài tập thực hành.",
    idUser: 1067,
    name: "Lê Thị Hồng Nhung",
  },
  {
    idReport: 11,
    contentReport: "Nội dung bài giảng thiếu ví dụ minh họa cụ thể.",
    idUser: 1102,
    name: "Phan Quang Huy",
  },
  {
    idReport: 12,
    contentReport: "Không có cập nhật mới như đã cam kết trong mô tả khóa học.",
    idUser: 1170,
    name: "Trịnh Thị Mai",
  },
  {
    idReport: 13,
    contentReport: "Giọng nói giảng viên đơn điệu, gây buồn ngủ.",
    idUser: 1121,
    name: "Đặng Văn Lâm",
  },
  {
    idReport: 14,
    contentReport: "Không có mục tiêu học tập rõ ràng ở đầu mỗi chương.",
    idUser: 1005,
    name: "Phạm Thị Hồng",
  },
  {
    idReport: 15,
    contentReport: "Một số câu hỏi kiểm tra không khớp với nội dung đã học.",
    idUser: 1118,
    name: "Nguyễn Hữu Đạt",
  },
  {
    idReport: 16,
    contentReport:
      "Khóa học không phù hợp với người mới bắt đầu như quảng cáo.",
    idUser: 1162,
    name: "Tạ Thị Diễm",
  },
  {
    idReport: 17,
    contentReport: "Video không có chức năng điều chỉnh tốc độ phát.",
    idUser: 1029,
    name: "Đinh Thanh Sơn",
  },
  {
    idReport: 18,
    contentReport: "Không có sự hỗ trợ từ cộng đồng học viên.",
    idUser: 1093,
    name: "Hoàng Kim Ngân",
  },
  {
    idReport: 19,
    contentReport: "Slide trình chiếu không rõ ràng, chữ quá nhỏ.",
    idUser: 1055,
    name: "Mai Anh Dũng",
  },
  {
    idReport: 20,
    contentReport: "Nội dung mang tính lý thuyết, thiếu thực tiễn.",
    idUser: 1147,
    name: "Nguyễn Thị Cẩm Tú",
  },
];

export const posts: Array<PostType> = [
  {
    idCourse: 1,
    title: "Lập trình JavaScript cơ bản",
    subTitle: "Học JavaScript từ con số 0",
    description:
      "Khóa học dành cho người mới bắt đầu tìm hiểu về JavaScript và phát triển web.",
    price: 199000,
    isAccept: true,
  },
  {
    idCourse: 2,
    title: "ReactJS cho người mới",
    subTitle: "Xây dựng ứng dụng với React",
    description:
      "Học cách tạo giao diện người dùng hiện đại bằng React và các thư viện phổ biến.",
    price: 249000,
    isAccept: true,
  },
  {
    idCourse: 3,
    title: "NodeJS và Express",
    subTitle: "Lập trình backend với NodeJS",
    description: "Xây dựng API mạnh mẽ và hiệu quả sử dụng Express và NodeJS.",
    price: 299000,
    isAccept: false,
  },
  {
    idCourse: 4,
    title: "HTML & CSS Pro",
    subTitle: "Thiết kế web chuyên nghiệp",
    description:
      "Tạo giao diện người dùng đẹp mắt với HTML5 và CSS3, responsive và mobile-first.",
    price: 149000,
    isAccept: true,
  },
  {
    idCourse: 5,
    title: "MongoDB cho người mới bắt đầu",
    subTitle: "Cơ sở dữ liệu NoSQL",
    description:
      "Tìm hiểu cách lưu trữ và truy xuất dữ liệu với MongoDB trong các ứng dụng thực tế.",
    price: 179000,
    isAccept: true,
  },
  {
    idCourse: 6,
    title: "TypeScript nâng cao",
    subTitle: "Tăng cường JavaScript với TypeScript",
    description:
      "Viết mã dễ bảo trì và có kiểm tra kiểu mạnh mẽ bằng TypeScript.",
    price: 229000,
    isAccept: false,
  },
  {
    idCourse: 7,
    title: "Python cho Data Science",
    subTitle: "Phân tích và trực quan hóa dữ liệu",
    description:
      "Khóa học tập trung vào sử dụng Python trong phân tích dữ liệu, pandas, matplotlib, và numpy.",
    price: 269000,
    isAccept: false,
  },
  {
    idCourse: 8,
    title: "Khóa học Next.js từ A-Z",
    subTitle: "Fullstack với React & Next.js",
    description:
      "Tạo các ứng dụng web nhanh, tối ưu SEO và tích hợp server-side rendering với Next.js.",
    price: 299000,
    isAccept: true,
  },
  {
    idCourse: 9,
    title: "Git và GitHub chuyên sâu",
    subTitle: "Quản lý mã nguồn hiệu quả",
    description:
      "Nắm vững quy trình làm việc với Git, GitHub và cách hợp tác nhóm hiệu quả.",
    price: 99000,
    isAccept: false,
  },
  {
    idCourse: 10,
    title: "Docker cho Developer",
    subTitle: "Triển khai ứng dụng dễ dàng",
    description:
      "Khóa học giúp bạn hiểu và sử dụng Docker để phát triển, kiểm thử và triển khai ứng dụng.",
    price: 189000,
    isAccept: true,
  },
];
