import { Pagination as MuiPagination } from "@mui/material";
import { useMemo } from "react";

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
  const totalPages = useMemo(() => {
    return dataLength < limit && page > 1 ? page : page + 1;
  }, [page, limit, dataLength]);
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
