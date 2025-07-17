import { sendRequest } from "utils/api";

type LoginPayload = {
    email: string;
    password: string;
};
type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    gender: string;
};


export const authService = {
    login: async (payload: LoginPayload): Promise<IBackendRes<any>> => {
        return await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
            method: "POST",
            body: payload,
        });
    },

    register: async (payload: RegisterPayload) => {
        return await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
            method: "POST",
            body: payload,
        });
    },
    // Gửi mã xác nhận reset password
    requestPasswordReset: async (email: string) => {
        return await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/retry-password`,
            method: "POST",
            body: { email },
        });
    },

    // Xác thực code và đổi mật khẩu
    resetPassword: async (payload: {
        email: string;
        code: string;
        password: string;
        confirmPassword: string;
    }) => {
        return await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/change-password`,
            method: "POST",
            body: payload,
        });
    },

    resendActivationCode: (email: string) => {
        return sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/retry-active`,
            method: 'POST',
            body: { email },
        });
    },

    verifyActivationCode: (code: string, userId: string) => {
        return sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check-code`,
            method: 'POST',
            body: { code, userId },
        });
    },

};


