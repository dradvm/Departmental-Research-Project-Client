'use client'

import { useState } from 'react'
import { authService } from 'services/auth.service'
import { sendRequest } from 'utils/api'
import { useHasMounted } from 'utils/customHook'

export default function ModalResetPassword({ isModalOpen, setIsModalOpen }: any) {
    const hasMounted = useHasMounted()

    const [step, setStep] = useState(1)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [errors, setErrors] = useState<{
        email?: string
        code?: string
        newPassword?: string
        confirmPassword?: string
    }>({})

    if (!hasMounted) return null

    const handleClose = () => {
        setIsModalOpen(false)
        setStep(1)
        setEmail('')
        setCode('')
        setNewPassword('')
        setConfirmPassword('')
        setErrors({})
    }

    const handleNextStep1 = async () => {
        const newErrors: typeof errors = {}

        if (!email.trim()) {
            newErrors.email = 'Vui lòng nhập email.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Email không hợp lệ.'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})

        const res = await authService.requestPasswordReset(email);

        if (res?.data) {
            setEmail(res.data.email)
            setStep(2)
        } else {
            setErrors({ email: res?.message || 'Không thể gửi mã xác nhận.' })
        }
    }

    const handleNextStep2 = async () => {
        const newErrors: typeof errors = {}

        if (!code.trim()) newErrors.code = 'Vui lòng nhập mã xác nhận.'
        if (!newPassword.trim()) newErrors.newPassword = 'Vui lòng nhập mật khẩu mới.'
        else if (newPassword.length < 6) newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự.'
        if (!confirmPassword.trim()) newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu.'
        else if (newPassword !== confirmPassword)
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.'

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})

        const res = await authService.resetPassword({
            email,
            code,
            password: newPassword,
            confirmPassword,
        });


        if (res?.data) {
            setStep(3)
        } else {
            setErrors({ code: res?.message || 'Mã xác nhận không đúng hoặc đã hết hạn.' })
        }
    }

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 1))
        setErrors({})
    }

    const stepTitle = ['Email', 'Verification', 'Success']

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Quên mật khẩu</h2>
                        <label className="block text-sm text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Nhập email để lấy lại mật khẩu"
                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </>
                )
            case 2:
                return (
                    <>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Nhập mã xác nhận</h2>

                        <label className="block text-sm text-gray-700 mb-1">Mã xác nhận</label>
                        <input
                            type="text"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                            placeholder="Mã xác nhận đã gửi qua email"
                            className={`w-full px-3 py-2 mb-1 border ${errors.code ? 'border-red-500' : 'border-gray-300'
                                } rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                        {errors.code && <p className="text-red-500 text-sm mb-3">{errors.code}</p>}

                        <label className="block text-sm text-gray-700 mb-1">Mật khẩu mới</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới"
                                className={`w-full px-3 py-2 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-indigo-600"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}

                        <label className="block text-sm text-gray-700 mt-4 mb-1">Xác nhận mật khẩu</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu mới"
                                className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-indigo-600"
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </>
                )
            case 3:
                return (
                    <>
                        <h2 className="text-lg font-semibold text-green-600 mb-2">Thành công!</h2>
                        <p className="text-sm text-gray-700">
                            Mật khẩu đã được thay đổi thành công. Bạn có thể đăng nhập với mật khẩu mới.
                        </p>
                    </>
                )
            default:
                return null
        }
    }

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-0">
                        <div className="px-6 pt-6">
                            <ol className="flex items-center text-sm font-medium text-gray-500 sm:text-base">
                                {stepTitle.map((label, idx) => {
                                    const isActive = step === idx + 1
                                    const isCompleted = step > idx + 1
                                    return (
                                        <li
                                            key={idx}
                                            className={`flex items-center ${isCompleted
                                                ? 'text-green-600'
                                                : isActive
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-400'
                                                } after:mx-4 after:hidden sm:after:inline-block after:w-full after:h-1 after:border-b after:border-gray-200`}
                                        >
                                            <span className="flex items-center">
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

                        <div className="px-6 py-5">{renderStepContent()}</div>

                        <div className="bg-gray-100 px-6 py-4 flex justify-between">
                            <button
                                onClick={step === 1 ? handleClose : handleBack}
                                className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                            >
                                {step === 1 ? 'Hủy' : 'Quay lại'}
                            </button>

                            {step === 1 && (
                                <button
                                    onClick={handleNextStep1}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                    disabled={!email.trim()}
                                >
                                    Gửi mã
                                </button>
                            )}
                            {step === 2 && (
                                <button
                                    onClick={handleNextStep2}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                    disabled={!code.trim() || !newPassword.trim() || !confirmPassword.trim()}
                                >
                                    Tiếp theo
                                </button>
                            )}
                            {step === 3 && (
                                <button
                                    onClick={handleClose}
                                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
                                >
                                    Đóng
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
