import axiosInstance from "./http";

const TestService = {
  payment: async (payment: unknown) =>
    axiosInstance.post("/test/create-intent", payment),
};
export default TestService;
