import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface NavLinkPorps extends ComponentProps<"a"> {
  children: React.ReactNode;
}

export const NavLink = (props: NavLinkPorps) => {
  return (
    <a
      {...props}
      className={twMerge("font-medium text-sm text-zinc-300", props.className)}
    >
      {props.children}
    </a>
  );
};
