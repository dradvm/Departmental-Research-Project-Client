import { Account } from "types/account";
import { ReportType } from "types/report";
import { PaymentType } from "types/payment";
import { PostType } from "types/post";
import { ItemCartType } from "types/itemcart";
import { GlobalCouponType, ProductCouponType } from "types/coupon";
import { CouponType } from "./enums/coupon.enum";

export const teachers: Array<Account> = [
    {
        idUser: 1,
        name: "Nguyễn Văn A",
        biography: "Giảng viên chuyên ngành Công nghệ thông tin với hơn 10 năm kinh nghiệm giảng dạy lập trình.",
        role: "teacher",
        birthday: "1985-04-12",
        email: "nguyenvana@university.edu.vn"
    },
    {
        idUser: 2,
        name: "Trần Thị B",
        biography: "Chuyên gia trong lĩnh vực trí tuệ nhân tạo và học máy.",
        role: "teacher",
        birthday: "1987-09-23",
        email: "tranthib@university.edu.vn"
    },
    {
        idUser: 3,
        name: "Lê Minh Cường",
        biography: "Giảng viên lập trình web với các công nghệ hiện đại như React, Node.js.",
        role: "teacher",
        birthday: "1990-02-18",
        email: "lecuong@university.edu.vn"
    },
    {
        idUser: 4,
        name: "Phạm Thị Dung",
        biography: "Đam mê giảng dạy Python và ứng dụng phân tích dữ liệu.",
        role: "teacher",
        birthday: "1989-07-10",
        email: "phamdung@university.edu.vn"
    },
    {
        idUser: 5,
        name: "Hoàng Văn E",
        biography: "Từng làm việc tại các công ty phần mềm lớn, hiện đang giảng dạy DevOps và Docker.",
        role: "teacher",
        birthday: "1982-11-05",
        email: "hoange@university.edu.vn"
    },
    {
        idUser: 6,
        name: "Đỗ Thị Hạnh",
        biography: "Chuyên môn về cơ sở dữ liệu và thiết kế hệ thống thông tin.",
        role: "teacher",
        birthday: "1986-03-08",
        email: "dothihanh@university.edu.vn"
    },
    {
        idUser: 7,
        name: "Ngô Quang Huy",
        biography: "Giảng viên lĩnh vực bảo mật và an toàn thông tin.",
        role: "teacher",
        birthday: "1991-12-15",
        email: "ngohuy@university.edu.vn"
    },
    {
        idUser: 8,
        name: "Vũ Kim Liên",
        biography: "Có kinh nghiệm giảng dạy về UI/UX Design và frontend development.",
        role: "teacher",
        birthday: "1988-06-01",
        email: "vulien@university.edu.vn"
    },
    {
        idUser: 9,
        name: "Phan Minh Nhật",
        biography: "Thành thạo về lập trình hướng đối tượng và Java.",
        role: "teacher",
        birthday: "1984-10-28",
        email: "phanminhnhat@university.edu.vn"
    },
    {
        idUser: 10,
        name: "Bùi Thị Thanh",
        biography: "Đang nghiên cứu và giảng dạy về công nghệ Blockchain và Web3.",
        role: "teacher",
        birthday: "1992-08-16",
        email: "buithanh@university.edu.vn"
    },
    {
        idUser: 11,
        name: "Ngô Hữu Cường",
        biography: "Giảng viên chuyên ngành lập trình hướng đối tượng với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1984-08-22",
        email: "ngohuucuong11@university.edu.vn"
    },
    {
        idUser: 12,
        name: "Lê Văn Nhật",
        biography: "Giảng viên chuyên ngành bảo mật với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1988-04-08",
        email: "levannhat12@university.edu.vn"
    },
    {
        idUser: 13,
        name: "Đỗ Kim Trang",
        biography: "Giảng viên chuyên ngành trí tuệ nhân tạo với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1980-11-02",
        email: "dokimtrang13@university.edu.vn"
    },
    {
        idUser: 14,
        name: "Phạm Thanh Tùng",
        biography: "Giảng viên chuyên ngành dữ liệu lớn với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1985-02-17",
        email: "phamthanhtung14@university.edu.vn"
    },
    {
        idUser: 15,
        name: "Vũ Thị Lan",
        biography: "Giảng viên chuyên ngành công nghệ phần mềm với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1990-06-09",
        email: "vuthilan15@university.edu.vn"
    },
    {
        idUser: 16,
        name: "Nguyễn Hồng Quân",
        biography: "Giảng viên chuyên ngành hệ thống nhúng với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1982-10-30",
        email: "nguyenhongquan16@university.edu.vn"
    },
    {
        idUser: 17,
        name: "Trần Minh Tuấn",
        biography: "Giảng viên chuyên ngành kỹ thuật phần mềm với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1987-01-19",
        email: "tranminhtuan17@university.edu.vn"
    },
    {
        idUser: 18,
        name: "Lý Thị Hạnh",
        biography: "Giảng viên chuyên ngành lập trình di động với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1989-09-14",
        email: "lythihanh18@university.edu.vn"
    },
    {
        idUser: 19,
        name: "Bùi Văn Đạt",
        biography: "Giảng viên chuyên ngành cơ sở dữ liệu với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1983-03-25",
        email: "buivandat19@university.edu.vn"
    },
    {
        idUser: 20,
        name: "Đặng Thị Mai",
        biography: "Giảng viên chuyên ngành thiết kế giao diện người dùng với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1991-07-13",
        email: "dangthimai20@university.edu.vn"
    },
    {
        idUser: 21,
        name: "Nguyễn Văn Hậu",
        biography: "Giảng viên chuyên ngành lập trình Web với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1984-11-03",
        email: "nguyenvanhau21@university.edu.vn"
    },
    {
        idUser: 22,
        name: "Phan Thị Ngọc",
        biography: "Giảng viên chuyên ngành AI với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1986-08-29",
        email: "phanthingoc22@university.edu.vn"
    },
    {
        idUser: 23,
        name: "Đỗ Trung Dũng",
        biography: "Giảng viên chuyên ngành DevOps với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1981-12-10",
        email: "dotrungdung23@university.edu.vn"
    },
    {
        idUser: 24,
        name: "Trịnh Thị Tuyết",
        biography: "Giảng viên chuyên ngành an toàn thông tin với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1985-04-07",
        email: "trinhthituyet24@university.edu.vn"
    },
    {
        idUser: 25,
        name: "Hoàng Văn Khoa",
        biography: "Giảng viên chuyên ngành lập trình Java với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1987-02-12",
        email: "hoangvankhoa25@university.edu.vn"
    },
    {
        idUser: 26,
        name: "Lê Thị Ngân",
        biography: "Giảng viên chuyên ngành Python với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1992-10-06",
        email: "lethingan26@university.edu.vn"
    },
    {
        idUser: 27,
        name: "Trần Quang Lộc",
        biography: "Giảng viên chuyên ngành phân tích dữ liệu với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1980-01-18",
        email: "tranquangloc27@university.edu.vn"
    },
    {
        idUser: 28,
        name: "Võ Thị Cúc",
        biography: "Giảng viên chuyên ngành hệ điều hành với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1989-06-03",
        email: "vothicuc28@university.edu.vn"
    },
    {
        idUser: 29,
        name: "Phạm Quốc Hưng",
        biography: "Giảng viên chuyên ngành mạng máy tính với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1986-03-22",
        email: "phamquochung29@university.edu.vn"
    },
    {
        idUser: 30,
        name: "Nguyễn Thị Bích",
        biography: "Giảng viên chuyên ngành CNTT với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1983-09-27",
        email: "nguyenthibich30@university.edu.vn"
    },
    {
        idUser: 31,
        name: "Hồ Văn Tài",
        biography: "Giảng viên chuyên ngành phân tích hệ thống với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1981-08-16",
        email: "hovantai31@university.edu.vn"
    },
    {
        idUser: 32,
        name: "Mai Thị Hòa",
        biography: "Giảng viên chuyên ngành cơ sở dữ liệu với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1987-12-11",
        email: "maithihoa32@university.edu.vn"
    },
    {
        idUser: 33,
        name: "Ngô Quốc Việt",
        biography: "Giảng viên chuyên ngành phần mềm mã nguồn mở với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1990-04-15",
        email: "ngoquocviet33@university.edu.vn"
    },
    {
        idUser: 34,
        name: "Đinh Thị Nhàn",
        biography: "Giảng viên chuyên ngành công nghệ phần mềm với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1982-07-05",
        email: "dinhthinhan34@university.edu.vn"
    },
    {
        idUser: 35,
        name: "Phạm Văn Dũng",
        biography: "Giảng viên chuyên ngành lập trình backend với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1988-01-25",
        email: "phamvandung35@university.edu.vn"
    },
    {
        idUser: 36,
        name: "Trịnh Minh Hiếu",
        biography: "Giảng viên chuyên ngành lập trình frontend với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1985-05-20",
        email: "trinhminhhieu36@university.edu.vn"
    },
    {
        idUser: 37,
        name: "Lê Thị Lý",
        biography: "Giảng viên chuyên ngành hệ thống thông tin với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1991-03-17",
        email: "lethily37@university.edu.vn"
    },
    {
        idUser: 38,
        name: "Nguyễn Hữu Thắng",
        biography: "Giảng viên chuyên ngành blockchain với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1986-09-09",
        email: "nguyenhuuthang38@university.edu.vn"
    },
    {
        idUser: 39,
        name: "Phan Thị Linh",
        biography: "Giảng viên chuyên ngành UI/UX với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1984-06-12",
        email: "phanthilinh39@university.edu.vn"
    },
    {
        idUser: 40,
        name: "Đặng Minh Tuấn",
        biography: "Giảng viên chuyên ngành Machine Learning với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1992-11-26",
        email: "dangminhtuan40@university.edu.vn"
    },
    {
        idUser: 41,
        name: "Trần Thị Nguyệt",
        biography: "Giảng viên chuyên ngành điện toán đám mây với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1983-02-06",
        email: "tranthinguyet41@university.edu.vn"
    },
    {
        idUser: 42,
        name: "Lý Văn Quang",
        biography: "Giảng viên chuyên ngành CNTT ứng dụng với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1990-08-03",
        email: "lyvanquang42@university.edu.vn"
    },
    {
        idUser: 43,
        name: "Đoàn Thị Hương",
        biography: "Giảng viên chuyên ngành mạng máy tính với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1987-10-28",
        email: "doanthihuong43@university.edu.vn"
    },
    {
        idUser: 44,
        name: "Nguyễn Văn Hòa",
        biography: "Giảng viên chuyên ngành hệ thống phân tán với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1982-05-14",
        email: "nguyenvanhoa44@university.edu.vn"
    },
    {
        idUser: 45,
        name: "Phạm Thị Thu",
        biography: "Giảng viên chuyên ngành kỹ thuật dữ liệu với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1991-12-18",
        email: "phamthithu45@university.edu.vn"
    },
    {
        idUser: 46,
        name: "Trần Minh Vũ",
        biography: "Giảng viên chuyên ngành trí tuệ nhân tạo với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1980-03-04",
        email: "tranminhvu46@university.edu.vn"
    },
    {
        idUser: 47,
        name: "Vũ Thị Hà",
        biography: "Giảng viên chuyên ngành thiết kế phần mềm với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1986-07-23",
        email: "vuthiha47@university.edu.vn"
    },
    {
        idUser: 48,
        name: "Ngô Văn Lâm",
        biography: "Giảng viên chuyên ngành quản lý dự án CNTT với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1985-11-01",
        email: "ngovanlam48@university.edu.vn"
    },
    {
        idUser: 49,
        name: "Mai Hữu Hưng",
        biography: "Giảng viên chuyên ngành kỹ thuật lập trình với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1988-01-07",
        email: "maihuuhung49@university.edu.vn"
    },
    {
        idUser: 50,
        name: "Nguyễn Ngọc Bình",
        biography: "Giảng viên chuyên ngành lập trình hướng đối tượng với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.",
        role: "teacher",
        birthday: "1975-02-28",
        email: "nguyenngocbinh50@university.edu.vn"
    }
];


export const students: Array<Account> = [
    {
        idUser: 101,
        name: "Nguyễn Thị Hoa",
        biography: "Sinh viên năm 2 ngành Công nghệ Thông tin, yêu thích lập trình web.",
        role: "student",
        birthday: "2003-05-10",
        email: "nguyenthihoa@student.edu.vn"
    },
    {
        idUser: 102,
        name: "Trần Văn Khánh",
        biography: "Học viên chuyển ngành, hiện đang học lập trình Java căn bản.",
        role: "student",
        birthday: "1998-11-22",
        email: "trankhanh@student.edu.vn"
    },
    {
        idUser: 103,
        name: "Lê Thị Bích",
        biography: "Sinh viên năm cuối, đam mê thiết kế giao diện người dùng.",
        role: "student",
        birthday: "2001-07-14",
        email: "lebich@student.edu.vn"
    },
    {
        idUser: 104,
        name: "Phạm Minh Tâm",
        biography: "Đã học qua Python và muốn nâng cao kỹ năng xử lý dữ liệu.",
        role: "student",
        birthday: "1999-03-03",
        email: "phamminhtam@student.edu.vn"
    },
    {
        idUser: 105,
        name: "Đinh Tuấn Kiệt",
        biography: "Quan tâm đến phát triển ứng dụng di động với React Native.",
        role: "student",
        birthday: "2000-08-17",
        email: "dinhtk@student.edu.vn"
    },
    {
        idUser: 106,
        name: "Hoàng Thị Nhung",
        biography: "Mới bắt đầu học lập trình, đang học khóa C cơ bản.",
        role: "student",
        birthday: "2004-01-25",
        email: "hoangnhung@student.edu.vn"
    },
    {
        idUser: 107,
        name: "Ngô Văn Quân",
        biography: "Đã học các khóa HTML/CSS, đang tìm hiểu về JavaScript.",
        role: "student",
        birthday: "2002-06-30",
        email: "ngoquanstu@student.edu.vn"
    },
    {
        idUser: 108,
        name: "Vũ Thị Mai",
        biography: "Học viên ngành thiết kế, yêu thích front-end development.",
        role: "student",
        birthday: "2001-09-12",
        email: "vuthimai@student.edu.vn"
    },
    {
        idUser: 109,
        name: "Phan Minh Trí",
        biography: "Học viên tự học, đang theo học khóa Node.js nâng cao.",
        role: "student",
        birthday: "1997-12-09",
        email: "phanminhtri@student.edu.vn"
    },
    {
        idUser: 110,
        name: "Bùi Thị Thảo",
        biography: "Quan tâm đến Data Science và AI, học các khóa Python.",
        role: "student",
        birthday: "2000-04-05",
        email: "buithithao@student.edu.vn"
    }
];

export const courses: Array<ItemCartType> = [
    {
        id: 1,
        name: "Lập Trình Web Với Node.js",
        teacherId: "nguyenvanan",
        ratingScore: 4.6,
        reviewCount: 154,
        totalDuration: 25,
        lessionCount: 78,
        price: 799000,
        isBestSeller: true
    },
    {
        id: 2,
        name: "Cơ Sở Dữ Liệu Nâng Cao",
        teacherId: "tranbichngoc",
        ratingScore: 4.3,
        reviewCount: 89,
        totalDuration: 20,
        lessionCount: 62,
        price: 599000,
        isBestSeller: false
    },
    {
        id: 3,
        name: "Trí Tuệ Nhân Tạo Cơ Bản",
        teacherId: "leminhtam",
        ratingScore: 4.7,
        reviewCount: 120,
        totalDuration: 15,
        lessionCount: 45,
        price: 699000,
        isBestSeller: true
    },
    {
        id: 4,
        name: "Phát Triển Ứng Dụng Di Động Với Flutter",
        teacherId: "phamquanghuy",
        ratingScore: 4.8,
        reviewCount: 203,
        totalDuration: 30,
        lessionCount: 91,
        price: 899000,
        isBestSeller: true
    },
    {
        id: 5,
        name: "An Toàn Thông Tin",
        teacherId: "dangthilan",
        ratingScore: 4.2,
        reviewCount: 67,
        totalDuration: 12,
        lessionCount: 37,
        price: 499000,
        isBestSeller: false
    }
]

export const reports: Array<ReportType> = [
    {
        idReport: 1,
        contentReport: "Khóa học không có phụ đề tiếng Việt như đã mô tả.",
        idUser: 1023,
        name: "Nguyễn Văn An"
    },
    {
        idReport: 2,
        contentReport: "Chất lượng video mờ, khó xem rõ nội dung giảng viên trình bày.",
        idUser: 1078,
        name: "Trần Thị Bích Ngọc"
    },
    {
        idReport: 3,
        contentReport: "Nội dung khóa học không đúng với tiêu đề và mô tả khóa học.",
        idUser: 1150,
        name: "Phạm Minh Tuấn"
    },
    {
        idReport: 4,
        contentReport: "Giảng viên không phản hồi câu hỏi trong phần thảo luận.",
        idUser: 1099,
        name: "Lê Thị Kim Chi"
    },
    {
        idReport: 5,
        contentReport: "Phát hiện nội dung sao chép từ khóa học khác, không phải bản gốc.",
        idUser: 1042,
        name: "Đỗ Mạnh Hùng"
    },
    {
        idReport: 6,
        contentReport: "Khóa học được giới thiệu là dành cho người mới bắt đầu, nhưng nội dung lại quá nâng cao. Không có hướng dẫn cụ thể để làm theo từng bước. Một số phần giảng viên nói quá nhanh, khó nắm bắt. Không có bài tập thực hành sau mỗi chương. Slide trình chiếu cũng không đồng bộ với nội dung giảng dạy. Cần cải thiện phần minh họa ví dụ để người học dễ hiểu hơn. Ngoài ra, phụ đề tự động sai nhiều, gây nhầm lẫn.",
        idUser: 1011,
        name: "Võ Thị Lan Hương"
    },
    {
        idReport: 7,
        contentReport: "Trong quá trình học, tôi phát hiện nhiều video không thể phát hoặc bị lỗi. Giảng viên không cập nhật bài học mới dù đã hứa hẹn. Nội dung trong video không đồng nhất, có đoạn lặp lại. Hệ thống không ghi nhớ tiến trình học, khiến tôi phải xem lại từ đầu. Bài kiểm tra cuối khóa không phản ánh đúng nội dung đã học. Cần bổ sung thêm tài liệu PDF hoặc bài đọc kèm theo. Hỗ trợ kỹ thuật phản hồi chậm.",
        idUser: 1184,
        name: "Ngô Thanh Phong"
    },
    {
        idReport: 8,
        contentReport: "Giảng viên phát âm không rõ ràng, khó nghe. Một số bài giảng quá ngắn và không có chiều sâu. Không có hướng dẫn chi tiết để thực hành. Nội dung bị trùng lặp với nhiều khóa học khác trên nền tảng. Thời gian phản hồi của giảng viên quá lâu. Cần cải thiện chất lượng âm thanh. Nhiều câu hỏi trong bài quiz bị lỗi định dạng.",
        idUser: 1133,
        name: "Bùi Thị Thu Trang"
    },
    {
        idReport: 9,
        contentReport: "Không thể tải tài liệu đính kèm trong bài học.",
        idUser: 1039,
        name: "Nguyễn Minh Nhật"
    },
    {
        idReport: 10,
        contentReport: "Khóa học không có phần bài tập thực hành.",
        idUser: 1067,
        name: "Lê Thị Hồng Nhung"
    },
    {
        idReport: 11,
        contentReport: "Nội dung bài giảng thiếu ví dụ minh họa cụ thể.",
        idUser: 1102,
        name: "Phan Quang Huy"
    },
    {
        idReport: 12,
        contentReport: "Không có cập nhật mới như đã cam kết trong mô tả khóa học.",
        idUser: 1170,
        name: "Trịnh Thị Mai"
    },
    {
        idReport: 13,
        contentReport: "Giọng nói giảng viên đơn điệu, gây buồn ngủ.",
        idUser: 1121,
        name: "Đặng Văn Lâm"
    },
    {
        idReport: 14,
        contentReport: "Không có mục tiêu học tập rõ ràng ở đầu mỗi chương.",
        idUser: 1005,
        name: "Phạm Thị Hồng"
    },
    {
        idReport: 15,
        contentReport: "Một số câu hỏi kiểm tra không khớp với nội dung đã học.",
        idUser: 1118,
        name: "Nguyễn Hữu Đạt"
    },
    {
        idReport: 16,
        contentReport: "Khóa học không phù hợp với người mới bắt đầu như quảng cáo.",
        idUser: 1162,
        name: "Tạ Thị Diễm"
    },
    {
        idReport: 17,
        contentReport: "Video không có chức năng điều chỉnh tốc độ phát.",
        idUser: 1029,
        name: "Đinh Thanh Sơn"
    },
    {
        idReport: 18,
        contentReport: "Không có sự hỗ trợ từ cộng đồng học viên.",
        idUser: 1093,
        name: "Hoàng Kim Ngân"
    },
    {
        idReport: 19,
        contentReport: "Slide trình chiếu không rõ ràng, chữ quá nhỏ.",
        idUser: 1055,
        name: "Mai Anh Dũng"
    },
    {
        idReport: 20,
        contentReport: "Nội dung mang tính lý thuyết, thiếu thực tiễn.",
        idUser: 1147,
        name: "Nguyễn Thị Cẩm Tú"
    },
];

export const payments: Array<PaymentType> = [
    {
        idPayment: 1,
        timePayment: "2025-06-10T09:15:00",
        totalPrice: 950000,
        idUser: 101,
        name: "Nguyễn Văn A",
        PaymentDetail: [
            { idPayment: 1, idCourse: 201, courseName: "JavaScript cơ bản", originalPrice: 600000, price: 500000 },
            { idPayment: 1, idCourse: 202, courseName: "HTML nâng cao", originalPrice: 500000, price: 450000 }
        ]
    },
    {
        idPayment: 2,
        timePayment: "2025-06-09T13:20:00",
        totalPrice: 300000,
        idUser: 102,
        name: "Trần Thị B",
        PaymentDetail: [
            { idPayment: 2, idCourse: 203, courseName: "Python cơ bản", originalPrice: 350000, price: 300000 }
        ]
    },
    {
        idPayment: 3,
        timePayment: "2025-06-08T18:10:00",
        totalPrice: 1100000,
        idUser: 103,
        name: "Lê Minh C",
        PaymentDetail: [
            { idPayment: 3, idCourse: 204, courseName: "ReactJS nâng cao", originalPrice: 800000, price: 700000 },
            { idPayment: 3, idCourse: 205, courseName: "Redux chuyên sâu", originalPrice: 450000, price: 400000 }
        ]
    },
    {
        idPayment: 4,
        timePayment: "2025-06-07T10:00:00",
        totalPrice: 600000,
        idUser: 104,
        name: "Phạm Quang D",
        PaymentDetail: [
            { idPayment: 4, idCourse: 206, courseName: "VueJS cơ bản", originalPrice: 700000, price: 600000 }
        ]
    },
    {
        idPayment: 5,
        timePayment: "2025-06-06T20:45:00",
        totalPrice: 1450000,
        idUser: 105,
        name: "Đỗ Hồng E",
        PaymentDetail: [
            { idPayment: 5, idCourse: 207, courseName: "Node.js", originalPrice: 800000, price: 700000 },
            { idPayment: 5, idCourse: 208, courseName: "Express nâng cao", originalPrice: 900000, price: 750000 }
        ]
    },
    {
        idPayment: 6,
        timePayment: "2025-06-05T17:30:00",
        totalPrice: 850000,
        idUser: 106,
        name: "Hoàng Gia F",
        PaymentDetail: [
            { idPayment: 6, idCourse: 209, courseName: "MongoDB cơ bản", originalPrice: 900000, price: 850000 }
        ]
    },
    {
        idPayment: 7,
        timePayment: "2025-06-04T14:50:00",
        totalPrice: 1250000,
        idUser: 107,
        name: "Ngô Thị G",
        PaymentDetail: [
            { idPayment: 7, idCourse: 210, courseName: "SQL nâng cao", originalPrice: 700000, price: 650000 },
            { idPayment: 7, idCourse: 211, courseName: "Phân tích hệ thống", originalPrice: 700000, price: 600000 }
        ]
    },
    {
        idPayment: 8,
        timePayment: "2025-06-03T11:25:00",
        totalPrice: 400000,
        idUser: 108,
        name: "Lý Quốc H",
        PaymentDetail: [
            { idPayment: 8, idCourse: 212, courseName: "HTML & CSS cơ bản", originalPrice: 450000, price: 400000 }
        ]
    },
    {
        idPayment: 9,
        timePayment: "2025-06-02T08:00:00",
        totalPrice: 1350000,
        idUser: 109,
        name: "Mai Văn I",
        PaymentDetail: [
            { idPayment: 9, idCourse: 213, courseName: "Angular", originalPrice: 750000, price: 650000 },
            { idPayment: 9, idCourse: 214, courseName: "Typescript", originalPrice: 800000, price: 700000 }
        ]
    },
    {
        idPayment: 10,
        timePayment: "2025-06-01T16:10:00",
        totalPrice: 600000,
        idUser: 110,
        name: "Tống Hà K",
        PaymentDetail: [
            { idPayment: 10, idCourse: 215, courseName: "REST API cơ bản", originalPrice: 700000, price: 600000 }
        ]
    }
]

export const posts: Array<PostType> = [
    {
        idCourse: 1,
        title: "Lập trình JavaScript cơ bản",
        subTitle: "Học JavaScript từ con số 0",
        description: "Khóa học dành cho người mới bắt đầu tìm hiểu về JavaScript và phát triển web.",
        price: 199000,
        isAccept: true,
    },
    {
        idCourse: 2,
        title: "ReactJS cho người mới",
        subTitle: "Xây dựng ứng dụng với React",
        description: "Học cách tạo giao diện người dùng hiện đại bằng React và các thư viện phổ biến.",
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
        description: "Tạo giao diện người dùng đẹp mắt với HTML5 và CSS3, responsive và mobile-first.",
        price: 149000,
        isAccept: true,
    },
    {
        idCourse: 5,
        title: "MongoDB cho người mới bắt đầu",
        subTitle: "Cơ sở dữ liệu NoSQL",
        description: "Tìm hiểu cách lưu trữ và truy xuất dữ liệu với MongoDB trong các ứng dụng thực tế.",
        price: 179000,
        isAccept: true,
    },
    {
        idCourse: 6,
        title: "TypeScript nâng cao",
        subTitle: "Tăng cường JavaScript với TypeScript",
        description: "Viết mã dễ bảo trì và có kiểm tra kiểu mạnh mẽ bằng TypeScript.",
        price: 229000,
        isAccept: false,
    },
    {
        idCourse: 7,
        title: "Python cho Data Science",
        subTitle: "Phân tích và trực quan hóa dữ liệu",
        description: "Khóa học tập trung vào sử dụng Python trong phân tích dữ liệu, pandas, matplotlib, và numpy.",
        price: 269000,
        isAccept: false,
    },
    {
        idCourse: 8,
        title: "Khóa học Next.js từ A-Z",
        subTitle: "Fullstack với React & Next.js",
        description: "Tạo các ứng dụng web nhanh, tối ưu SEO và tích hợp server-side rendering với Next.js.",
        price: 299000,
        isAccept: true,
    },
    {
        idCourse: 9,
        title: "Git và GitHub chuyên sâu",
        subTitle: "Quản lý mã nguồn hiệu quả",
        description: "Nắm vững quy trình làm việc với Git, GitHub và cách hợp tác nhóm hiệu quả.",
        price: 99000,
        isAccept: false,
    },
    {
        idCourse: 10,
        title: "Docker cho Developer",
        subTitle: "Triển khai ứng dụng dễ dàng",
        description: "Khóa học giúp bạn hiểu và sử dụng Docker để phát triển, kiểm thử và triển khai ứng dụng.",
        price: 189000,
        isAccept: true,
    }
];

export const productCoupon: ProductCouponType[] = [
    {
        idCoupon: 1,
        type: CouponType.VOUCHER,
        value: 250000,
        startDate: '2025-06-01T00:00:00',
        endDate: '2025-06-30T00:00:00',
        quantity: 100,
        appliedAmount: 20,
        minRequire: 500000,
        maxValueDiscount: 0,
        idUser: 101,
        name: 'Nguyễn Minh Khoa',
        idCourse: 11,
        title: 'Lập trình Web Fullstack'
    },
    {
        idCoupon: 2,
        type: CouponType.DISCOUNT,
        value: 15,
        startDate: '2025-06-05T00:00:00',
        endDate: '2025-06-25T00:00:00',
        quantity: 50,
        appliedAmount: 10,
        minRequire: 300000,
        maxValueDiscount: 150000,
        idUser: 102,
        name: 'Trần Thị Kim Ngân',
        idCourse: 22,
        title: 'Phân tích dữ liệu với Python'
    },
    {
        idCoupon: 3,
        type: CouponType.DISCOUNT,
        value: 10,
        startDate: '2025-06-10T00:00:00',
        endDate: '2025-06-20T00:00:00',
        quantity: 200,
        appliedAmount: 85,
        minRequire: 200000,
        maxValueDiscount: 100000,
        idUser: 103,
        name: 'Phạm Tuấn Anh',
        idCourse: 33,
        title: 'Lập trình Java cơ bản'
    },
    {
        idCoupon: 4,
        type: CouponType.VOUCHER,
        value: 100000,
        startDate: '2025-06-03T00:00:00',
        endDate: '2025-06-15T00:00:00',
        quantity: 75,
        appliedAmount: 5,
        minRequire: 250000,
        maxValueDiscount: 0,
        idUser: 104,
        name: 'Lê Thị Mỹ Duyên',
        idCourse: 44,
        title: 'Nhập môn Trí tuệ nhân tạo'
    },
    {
        idCoupon: 5,
        type: CouponType.DISCOUNT,
        value: 20,
        startDate: '2025-06-02T00:00:00',
        endDate: '2025-06-28T00:00:00',
        quantity: 120,
        appliedAmount: 60,
        minRequire: 400000,
        maxValueDiscount: 200000,
        idUser: 105,
        name: 'Đỗ Văn Khánh',
        idCourse: 55,
        title: 'Kỹ thuật phần mềm'
    }
];

export const globalCoupon: GlobalCouponType[] = [
    {
        idCoupon: 101,
        type: CouponType.DISCOUNT,
        value: 10,
        startDate: '2025-06-01T00:00:00',
        endDate: '2025-06-30T00:00:00',
        quantity: 500,
        appliedAmount: 100,
        minRequire: 300000,
        maxValueDiscount: 100000
    },
    {
        idCoupon: 102,
        type: CouponType.VOUCHER,
        value: 50000,
        startDate: '2025-06-05T00:00:00',
        endDate: '2025-06-25T00:00:00',
        quantity: 300,
        appliedAmount: 50,
        minRequire: 200000,
        maxValueDiscount: 0
    },
    {
        idCoupon: 103,
        type: CouponType.DISCOUNT,
        value: 25,
        startDate: '2025-06-10T00:00:00',
        endDate: '2025-06-20T00:00:00',
        quantity: 150,
        appliedAmount: 70,
        minRequire: 500000,
        maxValueDiscount: 250000
    },
    {
        idCoupon: 104,
        type: CouponType.VOUCHER,
        value: 100000,
        startDate: '2025-06-03T00:00:00',
        endDate: '2025-06-15T00:00:00',
        quantity: 200,
        appliedAmount: 40,
        minRequire: 400000,
        maxValueDiscount: 0
    },
    {
        idCoupon: 105,
        type: CouponType.DISCOUNT,
        value: 30,
        startDate: '2025-06-02T00:00:00',
        endDate: '2025-06-28T00:00:00',
        quantity: 250,
        appliedAmount: 120,
        minRequire: 600000,
        maxValueDiscount: 300000
    },
    {
        idCoupon: 106,
        type: CouponType.DISCOUNT,
        value: 10,
        startDate: '2025-06-01T00:00:00',
        endDate: '2025-06-30T00:00:00',
        quantity: 500,
        appliedAmount: 100,
        minRequire: 300000,
        maxValueDiscount: 100000
    },
    {
        idCoupon: 107,
        type: CouponType.DISCOUNT,
        value: 15,
        startDate: '2025-06-01T00:00:00',
        endDate: '2025-06-30T00:00:00',
        quantity: 300,
        appliedAmount: 80,
        minRequire: 400000,
        maxValueDiscount: 120000
    },
    {
        idCoupon: 108,
        type: CouponType.DISCOUNT,
        value: 20,
        startDate: '2025-06-01T00:00:00',
        endDate: '2025-06-30T00:00:00',
        quantity: 200,
        appliedAmount: 60,
        minRequire: 500000,
        maxValueDiscount: 150000
    },
    {
        idCoupon: 109,
        type: CouponType.DISCOUNT,
        value: 10,
        startDate: '2025-06-01T00:00:00',
        endDate: '2025-06-30T00:00:00',
        quantity: 400,
        appliedAmount: 90,
        minRequire: 350000,
        maxValueDiscount: 100000
    },
    {
        idCoupon: 110,
        type: CouponType.DISCOUNT,
        value: 12,
        startDate: '2025-06-01T00:00:00',
        endDate: '2025-06-30T00:00:00',
        quantity: 350,
        appliedAmount: 95,
        minRequire: 320000,
        maxValueDiscount: 110000
    },
];
