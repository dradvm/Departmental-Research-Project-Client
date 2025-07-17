'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { useEffect, useState } from 'react';
import { useUser } from '../../../../context/UserContext';

const currencyFormatter = (value: number) =>
    value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export default function RevenueBarChart() {
    const [data, setData] = useState([]);
    const { user } = useUser();

    if (!user) return null;

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/courses/revenue/${user.userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.access_token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error('Lỗi khi gọi API doanh thu');
                }

                const data = await res.json();

                // Chuyển revenue từ string => number (nếu cần)
                const formatted = data.map((item: any) => ({
                    ...item,
                    revenue: Number(item.revenue),
                }));

                setData(formatted);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRevenue();
    }, []);


    return (
        <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Thống kê doanh thu theo khóa học
            </h2>
            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="course"
                            tick={{ fontSize: 10 }}
                            angle={-30}
                            textAnchor="end"
                            interval={0}
                        />
                        <YAxis tickFormatter={(value) => value.toLocaleString('vi-VN') + ' ₫'} />
                        <Tooltip formatter={(value: number) => currencyFormatter(value)} />
                        <Bar dataKey="revenue" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
