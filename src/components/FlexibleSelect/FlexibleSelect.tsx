import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { ReactNode } from "react";

export interface SelectItem {
  value: string;
  text: string | ReactNode;
  disabled?: boolean;
}

export default function FlexibleSelect({
  minWidth = 120,
  value,
  handleValue,
  handleRenderValue,
  items,
}: {
  minWidth?: number;
  value: string;
  handleValue: (value: string) => void;
  handleRenderValue?: (selected: string) => string;
  items: SelectItem[];
}) {
  return (
    <FormControl sx={{ minWidth: minWidth }} size="small" className="">
      <Select
        value={value}
        onChange={(e) => handleValue(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        {...(handleRenderValue ? { renderValue: handleRenderValue } : {})}
        sx={{
          fontSize: "0.875rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(91, 73, 244)", // Khi hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(91, 73, 244)", // Khi focus
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                fontSize: "0.875rem", // Giảm font size
                "&:hover": {
                  backgroundColor: "rgb(234, 231, 255)",
                },
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: "rgb(234, 231, 255)",
                  },
                  backgroundColor: "rgb(234, 231, 255)",
                },
              },
            },
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value} disabled={item.disabled}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export function FlexibleSelectWithCheckbox({
  minWidth = 120,
  value = [],
  handleValue,
  handleRenderValue,
  items,
}: {
  minWidth?: number;
  value: string[];
  handleValue: (value: string[]) => void;
  handleRenderValue?: (selected: string[]) => string;
  items: SelectItem[];
}) {
  return (
    <FormControl sx={{ minWidth: minWidth }} size="small" className="">
      <Select
        value={value}
        multiple
        onChange={(e) => handleValue(e.target.value as string[])}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        {...(handleRenderValue ? { renderValue: handleRenderValue } : {})}
        sx={{
          fontSize: "0.875rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(91, 73, 244)", // Đổi màu viền ở đây
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(91, 73, 244)", // Khi hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(91, 73, 244)", // Khi focus
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                fontSize: "0.875rem", // Giảm font size
                "&:hover": {
                  backgroundColor: "rgb(234, 231, 255)",
                },
                "&.Mui-selected": {
                  "&:hover": {
                    backgroundColor: "rgb(234, 231, 255)",
                  },
                  backgroundColor: "rgb(234, 231, 255)",
                },
                "& .Mui-checked": {
                  color: "rgb(91, 73, 244)",
                },
              },
              "& .MuiCheckbox-root": {
                padding: 0,
                paddingRight: 1,
              },
              "& .MuiTypography-root": {
                fontSize: "0.875rem",
              },
            },
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value} disabled={item.disabled}>
            <Checkbox checked={value.indexOf(item.value) > -1} />
            <ListItemText primary={item.text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
