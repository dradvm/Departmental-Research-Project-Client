import axios from 'axios';
import { getSession } from 'next-auth/react';

export const createAxios = async (
    route = '',
    contentType = 'application/json',
    timeout = 30000
) => {
    // const session = await getSession();
    // const token = session?.access_token// 👈 fallback để test
    let session = null;
    while (!session) {
        session = await getSession();
        await new Promise((res) => setTimeout(res, 100));
    }
    console.log(">>>check session: ", session)
    const token = session?.user.access_token


    const instance = axios.create({
        baseURL: `http://localhost:3001/api${route}`,
        timeout,
        headers: {
            'Content-Type': contentType,
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });

    return instance;
};
