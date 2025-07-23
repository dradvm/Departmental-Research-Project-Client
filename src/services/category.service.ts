import axiosInstance from "./http";

const categoryService = {
    getAllCategories: () => axiosInstance.get("/categories"),
};

export default categoryService;
