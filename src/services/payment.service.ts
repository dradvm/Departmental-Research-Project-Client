import { PaymentBodyType, PaymentQueryType } from "types/payment";
import axiosInstance from "./http";

const paymentService = {
    createPayment: (body: PaymentBodyType) => {
        return axiosInstance.post(`/payment`, body);
    },
    getAllPayment: (params: PaymentQueryType) => {
        return axiosInstance.get(`/payment`, { params });
    },
}
export default paymentService;