export default function CartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-[80%] m-auto">{children}</div>;
}
