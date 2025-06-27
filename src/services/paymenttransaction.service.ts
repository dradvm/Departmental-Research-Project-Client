import axiosInstance from "./http"

const paymentTransactionService = {
    createPaymentTransaction: (body: { amount: number }) => {
        return axiosInstance.post(`/paymenttransaction/create-intent`, body);
    }
}
export default paymentTransactionService;