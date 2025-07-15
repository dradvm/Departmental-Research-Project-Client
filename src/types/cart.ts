interface CourseInCart {
    courseId: string;
    thumbnail: string;
    title: string;
    price: string;
    final_price: string;
}

interface TeacherInCart {
    userId: string;
    userName: string;
}

export interface ItemType {
    course: CourseInCart,
    teacher: TeacherInCart
}

export interface CartType {
    items: ItemType[],
    originalPrice: string,
    totalPrice: string,
    couponId: string | null,
    finalPrice: string,
    message: string,
    success: boolean
}