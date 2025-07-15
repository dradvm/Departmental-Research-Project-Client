// GET method
export interface PaymentQueryType {
    userId?: number;
    limit: number;
    skip: number;
    startDate?: string;
    endDate?: string;
    minPrice?: number;
    maxPrice?: number;
    userName?: string;
}

// POST method
export interface PaymentDetailBodyType {
    courseId: number;
}

export interface PaymentFilter {
    startDate?: string;
    endDate?: string;
    minPrice?: string;
    maxPrice?: string;
    searchText?: string;
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
    finalPrice: string;
}

export interface PaymentType {
    paymentId: number;
    timePayment: string;
    userId: number;
    userName: string;
    couponId: number | null;
    code: string | null;
    originalPrice: string;
    totalPrice: string;
    finalPrice: string;
    paymentDetail: PaymentDetailType[];
}

export interface PaymentDB {
    payments: PaymentType[];
    length: number;
}