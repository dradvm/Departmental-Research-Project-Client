'use client'

import { useState } from 'react'
import { sendRequest } from 'utils/api'
import { useHasMounted } from 'utils/customHook'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ModalReactive(props: any) {
    const { isModalOpen, setIsModalOpen, userEmail } = props
    const hasMounted = useHasMounted()
    const [step, setStep] = useState(1)
    const [code, setCode] = useState('')
    const [userId, setUserId] = useState('')

    if (!hasMounted) return <></>

    const handleClose = () => {
        setIsModalOpen(false)
        setStep(1)
        setCode('')
    }

    const handleResend = async () => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/retry-active`,
            method: 'POST',
            body: { email: userEmail },
        })
        if (res?.data) {
            setUserId(res?.data?.id)
            setStep(prev => Math.min(prev + 1, 3))
        } else {
            toast.error(`${res.message}`)
        }
    }

    const handleNext = async () => {
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/check-code`,
            method: 'POST',
            body: { code, userId: userId },
        })
        if (res?.data) {
            setStep(prev => Math.min(prev + 1, 3))
        } else {
            toast.error(`${res.message}`)
        }
    }
    const handleBack = () => setStep(prev => Math.max(prev - 1, 1))

    const handleDeactivate = () => {

        handleClose()
    }

    const stepTitle = ['Login', 'Verification', 'Confirmation']

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Tài khoản chưa được kích hoạt</h2>
                        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={userEmail}
                            readOnly
                            placeholder="Nhập email của bạn để resend lại mã code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"
                        />
                    </>
                )
            case 2:
                return (
                    <>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Nhập mã xác thực</h2>
                        <label htmlFor="code" className="block text-sm text-gray-700 mb-1">Mã xác thực</label>
                        <input
                            type="text"
                            id="code"
                            value={code}
                            required
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Nhập mã xác thực được gửi đến email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </>
                )
            case 3:
                return (
                    <>
                        <h2 className="text-lg font-semibold text-gray-900">Xác nhận</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Tài khoản đã được kích hoạt thành công với email <span className="font-medium">{userEmail}</span>. Vui lòng đăng nhập lại.
                        </p>
                    </>
                )
            default:
                return null
        }
    }

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
            <div className="fixed bottom-6 right-6">
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-0">
                            {/* Stepper */}
                            <div className="px-6 pt-6">
                                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                                    {stepTitle.map((label, idx) => {
                                        const isActive = step === idx + 1
                                        const isCompleted = step > idx + 1
                                        return (
                                            <li
                                                key={idx}
                                                className={`flex md:w-full items-center ${isCompleted
                                                    ? 'text-blue-600'
                                                    : isActive
                                                        ? 'text-indigo-600'
                                                        : 'text-gray-400'
                                                    } sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
                                            >
                                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                                    {isCompleted ? (
                                                        <svg className="w-4 h-4 me-2.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                        </svg>
                                                    ) : (
                                                        <span className="me-2">{idx + 1}</span>
                                                    )}
                                                    {label}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>

                            {/* Nội dung */}
                            <div className="px-6 py-5">{renderStepContent()}</div>

                            {/* Footer */}
                            <div className="bg-gray-100 px-6 py-4 flex justify-between">
                                <button
                                    onClick={step > 1 ? handleBack : handleClose}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                                >
                                    {step > 1 ? 'Back' : 'Cancel'}
                                </button>

                                {step < 3 ? (
                                    <button
                                        onClick={step === 1 ? handleResend : handleNext}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                        disabled={step === 2 && !code.trim()}
                                    >
                                        {step === 1 ? 'Resend' : 'Next'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleDeactivate}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                    >
                                        Close
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
