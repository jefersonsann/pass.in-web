import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Logo } from "../logo";
import { NavLink } from "../nav-link";

export const NavBar = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <div className="flex gap-5 items-center py-2">
      <NavLink href="/">
        <Logo />
      </NavLink>

      <nav className="flex gap-5">
        <NavLink
          href="/events"
          className={
            path === "/events" || path === "/" ? "text-orange-300" : ""
          }
        >
          Eventos
        </NavLink>
        <NavLink
          href="/attendees"
          className={path === "/attendees" ? "text-orange-300" : ""}
        >
          Participantes
        </NavLink>
      </nav>
    </div>
  );
};
