export interface UserType {
    userId: number;
    name?: string;
    gender?: string;
    biography?: string;
    role?: string;
    email?: string;
    isActive?: boolean;
    img?: string;
}

// use for get all user (admin function)
export interface UserReq {
    limit: number;
    skip: number;
    role: "USERS" | "TEACHER" | "STUDENT";
    searchText?: string;
}

// use for patch method: admin's update function
export interface UserUpdateBody {
    id: number;
    name?: string;
    biography?: string;
    img?: string;
}