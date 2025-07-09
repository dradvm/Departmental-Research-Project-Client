import { PaymentBodyType, PaymentQueryType } from "types/payment";
import axiosInstance from "./http";

const paymentService = {
    createPayment: (body: PaymentBodyType) => {
        return axiosInstance.post(`/payment`, body);
    },
    getAllPayment: (params: PaymentQueryType) => {
        return axiosInstance.get(`/payment`, { params });
    },
    createPaymentIntent: (body: { amount: number }) => {
        return axiosInstance.post(`/payment/create-intent`, body);
    },
    getAllMyTransaction: (params: PaymentQueryType) => {
        return axiosInstance.get(`/payment/my-transaction`, { params });
    }
}
export default paymentService;