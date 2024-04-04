import { Logo } from "../logo";

export const NavBar = () => {
  return (
    <div className="flex gap-5 items-center py-2">
      <Logo />

      <nav className="flex gap-5">
        <a href="/events" className="font-medium text-sm text-zinc-300">
          Eventos
        </a>
        <a href="/attendees" className="font-medium text-sm">
          Participantes
        </a>
      </nav>
    </div>
  );
};
