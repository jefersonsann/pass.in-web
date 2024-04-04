import React, { ComponentProps } from "react";

interface NavLinkPorps extends ComponentProps<"a"> {
  children: React.ReactNode;
}

export const NavLink = (props: NavLinkPorps) => {
  return (
    <a className="font-medium text-sm text-zinc-300" {...props}>
      {props.children}
    </a>
  );
};
