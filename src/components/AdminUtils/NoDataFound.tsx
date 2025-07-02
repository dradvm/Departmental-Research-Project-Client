export default function NoDataFound({ message }: { message: string }) {
  return (
    <div className="mt-8 text-center text-[20px] font-bold">{message}</div>
  );
}
