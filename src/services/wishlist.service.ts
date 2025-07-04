import axiosInstance from "./http";

const wishlistService = {
  getWishlist: (search: string) =>
    axiosInstance.get("/wishlist", {
      params: {
        search,
      },
    }),
  addWishlist: (courseId: number) =>
    axiosInstance.post("/wishlist", {
      courseId,
    }),
  removeWishlist: (courseId: number) =>
    axiosInstance.delete(`/wishlist/${courseId}`),
};
export default wishlistService;
