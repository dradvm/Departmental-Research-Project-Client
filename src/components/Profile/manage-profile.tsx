"use client";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import type React from "react";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userService } from "services/user.service";
import { User, Camera } from "lucide-react";
import { Button } from "components/Button/Button";
import Input from "components/Input/Input";
import TextField from "components/TextField/TextField";

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [nameError, setNameError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const avatarUrl = session?.user?.image || "";

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      // @ts-ignore: custom field
      setBiography(session.user.biography || "");
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    setIsDisabled(true);
    if (name.trim() === "") {
      setNameError("Tên là bắt buộc");
      return;
    } else {
      setNameError("");
    }

    if (!session?.user?.access_token) {
      alert("Phiên đăng nhập không khả dụng hoặc đã hết hạn.");
      return;
    }

    const accessToken = session.user.access_token;
    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("name", name);
    formData.append("biography", biography);

    try {
      const response = await userService.updateProfile(formData);
      const updatedImage = response.data?.data?.image || session.user?.image;
      await update({
        name,
        biography,
        image: updatedImage,
      });
      setIsDisabled(false);
      toast.success("Cập nhật hồ sơ thành công!");
      setFile(null);
    } catch (err) {
      setIsDisabled(false);
      toast.error("Cập nhật thất bại.");
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

      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Hồ sơ cá nhân
            </h1>
            <p className="text-gray-600">Cập nhật thông tin của bạn</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                    {file ? (
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : avatarUrl ? (
                      <img
                        src={`${avatarUrl}?v=${Date.now()}`}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Ảnh đại diện
                  </h3>
                  <p className="text-sm text-gray-500">
                    JPG, PNG hoặc GIF. Tối đa 5MB.
                  </p>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Họ và tên
                </label>
                <Input
                  handleValue={setName}
                  value={name}
                  placeholder="Nguyễn Văn A..."
                />

                {nameError && (
                  <p className="text-sm text-red-600 mt-1">{nameError}</p>
                )}
              </div>

              {/* Biography Field */}
              <div>
                <label
                  htmlFor="biography"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tiểu sử
                </label>
                <textarea
                  id="biography"
                  name="biography"
                  rows={4}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Viết vài câu về bản thân bạn..."
                  className="text-sm w-full px-4 py-2 placeholder:text-slate-700 border border-gray-300 rounded hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none overflow-y-auto"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Thông tin này sẽ được hiển thị công khai
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Hủy bỏ
                </button>
                <Button size="sm" variant="filled" disabled={isDisabled}>
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
