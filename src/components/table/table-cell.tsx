import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends ComponentProps<"td"> {}

export const TableCell = (props: TableCellProps) => {
  return (
    <td
      {...props}
      className={twMerge(
        "py-3 px-4 text-zinc-300 text-sm text-left",
        props.className
      )}
    />
  );
};