import { UserReq, UserUpdateBody } from "types/user";
import axiosInstance from "./http";

export const userService = {
    getAllUser: (params: UserReq) => {
        return axiosInstance.get("/users", { params });
    },
    updateAccount: (bodyReq: UserUpdateBody) => {
        return axiosInstance.patch("/users", bodyReq);
    },
    deleteAccount: (userId: number) => {
        return axiosInstance.delete(`/users/${userId}`);
    }
}