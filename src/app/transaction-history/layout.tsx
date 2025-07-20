export default function TransactionHistoryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-[80%] m-auto py-10">{children}</div>;
}
