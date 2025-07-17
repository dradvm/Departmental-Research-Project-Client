import { UserReq, UserUpdateBody } from "types/user";
import axiosInstance from "./http";

export const userService = {
  getAllUser: (params: UserReq) => {
    return axiosInstance.get("/users", { params });
  },
  // curently, admin does not use this function
  updateAccount: (bodyReq: UserUpdateBody) => {
    return axiosInstance.patch("/users", bodyReq);
  },
  // disable user account: isDeleted: true
  deleteAccount: (userId: number) => {
    return axiosInstance.delete(`/users/${userId}`);
  },
  // enable user account: isDeleted: false
  enableAccount: (userId: number) => {
    return axiosInstance.put(`/users/${userId}`);
  },
  changeRoleUser: () => axiosInstance.patch(`/users/role/instructor`),
    updateProfile: (formData: FormData) => {
        return axiosInstance.post("/users/update-profile", formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};
