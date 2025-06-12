interface PaymentDetail {
    idPayment: number;
    idCourse: number;
    courseName: string;
    // Giá gốc
    originalPrice: number;
    // Giá sau khuyến mãi
    price: number;
}

export interface PaymentType {
    idPayment: number;
    timePayment: string;
    totalPrice: number;
    idUser: number;
    name: string;
    PaymentDetail: PaymentDetail[];
}