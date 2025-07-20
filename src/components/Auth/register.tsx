"use client";
import { useState } from "react";
import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "services/auth.service";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Users } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [genderError, setGenderError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xoá lỗi khi người dùng chọn giới tính
    if (name === "gender") {
      setGenderError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, gender } = formData;

    // Reset lỗi
    setGenderError("");

    // Kiểm tra trường gender
    if (!gender) {
      setGenderError("Vui lòng chọn giới tính của bạn.");
      return;
    }

    const res = await authService.register({ email, password, name, gender });
    if (res?.data) {
      router.push(`/verify/${res?.data?.id}`);
    } else {
      toast.error(`${res?.message}`);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 flex items-center justify-center p-4 py-6">
        <div className="w-full max-w-md">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-purple-600 text-sm font-medium mb-4 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Về trang chủ
          </Link>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
            {/* Logo and Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded"></div>
                </div>
              </div>
              <h1 className="text-xl font-bold text-slate-800 mb-1">
                Tạo tài khoản mới
              </h1>
              <p className="text-slate-600 text-xs">
                Đăng ký để bắt đầu hành trình của bạn
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Field */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Nhập họ và tên của bạn"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Địa chỉ email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Nhập email của bạn"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Tạo mật khẩu mạnh"
                    className="w-full pl-10 pr-11 py-2.5 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Gender Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <label className="block text-xs font-semibold text-slate-700">
                    Giới tính
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center justify-center p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100/50 transition-colors duration-200 group">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="w-3 h-3 text-purple-600 border-slate-300 focus:ring-purple-500 focus:ring-1 mr-2"
                    />
                    <span className="text-xs text-slate-700 group-hover:text-slate-800">
                      Nam
                    </span>
                  </label>
                  <label className="flex items-center justify-center p-2.5 bg-slate-50/50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100/50 transition-colors duration-200 group">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="w-3 h-3 text-purple-600 border-slate-300 focus:ring-purple-500 focus:ring-1 mr-2"
                    />
                    <span className="text-xs text-slate-700 group-hover:text-slate-800">
                      Nữ
                    </span>
                  </label>
                </div>
                {genderError && (
                  <p className="text-xs text-red-500 mt-1">{genderError}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm"
              >
                Đăng ký
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-600 text-xs">
                Đã có tài khoản?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-purple-600 hover:text-purple-500 transition-colors duration-200"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-slate-500 text-xs">
              Bằng cách đăng ký, bạn đồng ý với{" "}
              <a href="#" className="text-purple-600 hover:text-purple-500">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" className="text-purple-600 hover:text-purple-500">
                Chính sách bảo mật
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
