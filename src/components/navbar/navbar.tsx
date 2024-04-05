import { Logo } from "../logo";
import { NavLink } from "../nav-link";

export const NavBar = () => {
  const pathname = location.pathname;

  return (
    <div className="flex gap-5 items-center py-2">
      <Logo />

      <nav className="flex gap-5">
        <NavLink
          href="/events"
          className={pathname === "/events" ? "text-orange-300" : ""}
        >
          Eventos
        </NavLink>
        <NavLink
          href="/attendees"
          className={pathname === "/attendees" ? "text-orange-300" : ""}
        >
          Participantes
        </NavLink>
      </nav>
    </div>
  );
};
