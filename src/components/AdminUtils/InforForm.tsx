import { UserType } from "types/user";

export default function InforForm({ account }: { account: UserType }) {
  return (
    <form>
      <div className="space-y-12">
        <div className="pb-4">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Thông tin cá nhân
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Họ tên
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={account.name}
                  readOnly
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Địa chỉ Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={account.email}
                  readOnly
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="role"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Vai trò
              </label>
              <div className="mt-2">
                <input
                  id="role"
                  name="role"
                  type="text"
                  defaultValue={account.role}
                  readOnly
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="biography"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Tiểu sử
              </label>
              <div className="mt-2">
                <textarea
                  id="biography"
                  name="biography"
                  rows={5}
                  defaultValue={account.biography || ""}
                  readOnly
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
