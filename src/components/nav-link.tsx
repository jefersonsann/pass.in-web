import React, { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface NavLinkPorps extends ComponentProps<"a"> {
  children: React.ReactNode;
  href: string;
}

export const NavLink = (props: NavLinkPorps) => {
  return (
    <Link
      to={props.href}
      {...props}
      className={twMerge("font-medium text-sm text-zinc-300", props.className)}
    />
  );
};
