'use client';

import { createAxios } from 'app/test/test.axios';
import { useEffect } from 'react';

export default function AxiosTestPage() {
    useEffect(() => {
        const callApi = async () => {
            const axiosInstance = await createAxios("/auth");
            const res = await axiosInstance.get("/test-axios");
            console.log(res.data);
        };

        callApi();
    }, []);


    return <div>Kiểm tra console log trên server và frontend</div>;
}
