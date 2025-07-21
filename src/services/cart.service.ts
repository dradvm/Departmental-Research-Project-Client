import axiosInstance from "./http";

const cartService = {
  addCourseIntoCart: (body: { courseId: number }) => {
    return axiosInstance.post("/cart", body);
  },
  getCart: (code?: string) => {
    return axiosInstance.get(`/cart`, { params: code ? { code } : {} });
  },
  deleteOneItem: (courseId: number) => {
    return axiosInstance.delete(`/cart/${courseId}`);
  },
  deleteAllItem: () => {
    return axiosInstance.delete(`/cart/delete/all`);
  },
  isExitInCart: (courseId: number) =>
    axiosInstance.get(`/cart/isExistInCart/${courseId}`),
};
export default cartService;
