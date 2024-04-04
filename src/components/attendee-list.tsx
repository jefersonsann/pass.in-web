import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

export const AttendeeList = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center">
          <Search className="w-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 px-3 outline-none border-0 p-0 text-sm ring-0"
            placeholder="Buscar participantes"
          />
        </div>
      </div>

      <div className="border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-sm font-semibold text-left">
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 border border-white/10 rounded"
                />
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Código
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Participante
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Data da inscrição
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left">
                Data do check-in
              </th>
              <th className="py-3 px-4 text-sm font-semibold text-left"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => {
              return (
                <tr
                  className="border-b border-white/10 hover:bg-white/5"
                  key={index}
                >
                  <td
                    style={{ width: "48px" }}
                    className="py-3 px-4 text-zinc-300 text-sm text-left"
                  >
                    <input
                      type="checkbox"
                      className="size-4 bg-transparent border border-white/10 rounded"
                    />
                  </td>
                  <td className="py-3 px-4 text-zinc-300 text-sm text-left">
                    123456789
                  </td>
                  <td className="py-3 px-4 text-zinc-300 text-sm text-left">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        Jeferson Santos
                      </span>
                      <span>me@jefersonsann.com</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-300 text-sm text-left">
                    7 dias atrás
                  </td>
                  <td className="py-3 px-4 text-zinc-300 text-sm text-left">
                    3 dias atrás
                  </td>
                  <td
                    style={{ width: "64px" }}
                    className="py-3 px-4 text-zinc-300 text-sm text-left"
                  >
                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td
                className="py-3 px-4 text-zinc-300 text-sm text-left"
                colSpan={3}
              >
                {" "}
                Mostrando 10 de 228 itens
              </td>
              <td
                className="py-3 px-4 text-zinc-300 text-sm text-right"
                colSpan={3}
              >
                <div className="inline-flex items-center gap-8">
                  <span>Pagina 1 de 28</span>

                  <div className="flex gap-1.5">
                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <ChevronsLeft className="size-4" />
                    </button>

                    <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                      <ChevronLeft className="size-4" />
                    </button>

                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronRight className="size-4" />
                    </button>

                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
