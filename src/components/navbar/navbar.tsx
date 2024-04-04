import { Logo } from "../logo";
import { NavLink } from "../nav-link";

export const NavBar = () => {
  return (
    <div className="flex gap-5 items-center py-2">
      <Logo />

      <nav className="flex gap-5">
        <NavLink href="/events">Eventos</NavLink>
        <NavLink href="/attendees" className="font-medium text-sm">
          Participantes
        </NavLink>
      </nav>
    </div>
  );
};
