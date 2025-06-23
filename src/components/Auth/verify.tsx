'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sendRequest } from 'utils/api';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verify = (props: any) => {
    const { id } = props;
    const router = useRouter();

    const [formData, setFormData] = useState({
        userId: '',
        code: '',
    });

    useEffect(() => {
        if (id) {
            setFormData((prev) => ({ ...prev, userId: id }));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userId, code } = formData;

        console.log(">>> check formData: ", formData);

        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check-code`,
            method: 'POST',
            body: { userId, code },
        });
        console.log(">>> check response: ", res)
        if (res?.data) {
            toast.success('Verification successful!');
            router.push('/auth/login');
        } else {
            toast.error(res?.message || 'Verification failed.');
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Link
                        href="/"
                        className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center mb-4"
                    >
                        ← Back to Home
                    </Link>

                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
                        Verify your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Hidden userId field */}
                        <input
                            type="hidden"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                        />

                        {/* Code */}
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-900">
                                Verification Code
                            </label>
                            <p className="text-xs text-gray-500 mt-1 mb-2">
                                We've sent the verification code to your email. Please check your inbox.
                            </p>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Verify
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already verified?
                        <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {' '}Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Verify;
