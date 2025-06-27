// GET method
export interface PaymentQueryType {
    userId?: number;
    limit: number;
    skip: number;
}

// POST method
export interface PaymentDetailBodyType {
    courseId: number;
}

export interface PaymentBodyType {
    itemCart: PaymentDetailBodyType[],
    originalPrice: number,
    totalPrice: number,
    couponId: number | null,
    finalPrice: number,
}

export interface PaymentDetailType {
    courseId: number;
    courseThumbnail: string;
    courseTitle: string;
    price: string;
    final_price: string;
}

export interface PaymentType {
    paymentId: number;
    timePayment: string;
    userId: number;
    userName: string;
    couponId: number | null;
    totalPrice: string;
    final_price: string;
    paymentDetail: PaymentDetailType[];
}