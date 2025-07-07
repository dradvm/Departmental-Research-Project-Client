import { UserType } from "types/user";

export default function InforForm({
  account,
  onChange,
  handleClose,
  updateAccount,
}: {
  account: UserType;
  onChange: (acc: UserType) => void;
  handleClose: () => void;
  updateAccount: (
    userId: number,
    name?: string,
    biography?: string,
    img?: string
  ) => void;
}) {
  function handleInputTextChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    onChange({ ...account, [e.target.name]: e.target.value });
  }

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
                  onChange={handleInputTextChange}
                  value={account.name}
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
                  onChange={handleInputTextChange}
                  value={account.email}
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
                  onChange={handleInputTextChange}
                  value={account.role}
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
                  onChange={handleInputTextChange}
                  value={account.biography || ""}
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
          onClick={() => {
            if (confirm(`Chưa lưu thay đổi, vẫn muốn rời đi`)) handleClose();
          }}
        >
          Hủy
        </button>
        <button
          // Notice: type
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() =>
            updateAccount(
              account.userId,
              account.name,
              account.biography,
              account.img
            )
          }
        >
          Lưu
        </button>
      </div>
    </form>
  );
}
