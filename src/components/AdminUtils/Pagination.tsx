import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dataLength: number;
  limit: number;
}

export function Pagination({
  page,
  setPage,
  dataLength,
  limit,
}: PaginationProps) {
  const totalPages = Math.ceil(dataLength / limit);
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <MuiPagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      shape="rounded"
      size="medium"
      showFirstButton
      showLastButton
      color="standard"
    />
  );
}
