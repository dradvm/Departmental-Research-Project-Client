import { Account } from "./types/account";
import { ReportType } from "./types/report";
import { PaymentType } from "./types/payment";
import { PostType } from "./types/post";

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

interface Course {
    name: string;
    teacherId: string;
    ratingScore: number;
    reviewCount: number;
    totalDuration: number;
    lessionCount: number;
    price: number;
    isBestSeller: boolean;
}

export const courses: Array<Course> = [
    {
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
        contentReport: "Khóa học không có phụ đề tiếng Việt như đã mô tả."
    },
    {
        idReport: 2,
        contentReport: "Chất lượng video mờ, khó xem rõ nội dung giảng viên trình bày."
    },
    {
        idReport: 3,
        contentReport: "Nội dung khóa học không đúng với tiêu đề và mô tả khóa học."
    },
    {
        idReport: 4,
        contentReport: "Giảng viên không phản hồi câu hỏi trong phần thảo luận."
    },
    {
        idReport: 5,
        contentReport: "Phát hiện nội dung sao chép từ khóa học khác, không phải bản gốc."
    }
]

export const payments: Array<PaymentType> = [
    { idPayment: 1, timePayment: "2025-06-01T10:30:00Z", totalPrice: 199000 },
    { idPayment: 2, timePayment: "2025-06-02T14:15:00Z", totalPrice: 299000 },
    { idPayment: 3, timePayment: "2025-06-03T09:45:00Z", totalPrice: 159000 },
    { idPayment: 4, timePayment: "2025-06-04T17:20:00Z", totalPrice: 499000 },
    { idPayment: 5, timePayment: "2025-06-05T12:00:00Z", totalPrice: 99000 },
    { idPayment: 6, timePayment: "2025-06-05T19:45:00Z", totalPrice: 209000 },
    { idPayment: 7, timePayment: "2025-06-06T08:10:00Z", totalPrice: 259000 },
    { idPayment: 8, timePayment: "2025-06-06T13:35:00Z", totalPrice: 189000 },
    { idPayment: 9, timePayment: "2025-06-07T11:25:00Z", totalPrice: 349000 },
    { idPayment: 10, timePayment: "2025-06-07T15:50:00Z", totalPrice: 399000 }
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
