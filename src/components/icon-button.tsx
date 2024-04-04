import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export const IconButton = ({ transparent, ...props }: IconButtonProps) => {
  return (
    <button
      className={twMerge(
        "border border-white/10 rounded-md p-1.5 disabled:cursor-not-allowed",
        transparent ? "bg-black/20" : "bg-white/10 hover:bg-white/15"
      )}
      {...props}
    />
  );
};
