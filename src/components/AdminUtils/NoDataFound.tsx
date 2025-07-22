import withRole from "components/WithRole/withRole";

function NoDataFound({ message }: { message: string }) {
  return (
    <div className="mt-8 text-center text-[20px] font-bold">{message}</div>
  );
}

export default withRole(NoDataFound, ["ADMIN"]);