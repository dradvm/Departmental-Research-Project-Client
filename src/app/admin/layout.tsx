import AdminHeader from "components/AdminUtils/AdminHeader";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-[90%] m-auto">
      <AdminHeader></AdminHeader>
      {children}
    </div>
  );
}
