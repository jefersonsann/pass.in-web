import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { EventProps } from "../@types/event-props";
import { IconButton } from "./icon-button";
import { Table } from "./table";
import { TableCell } from "./table/table-cell";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const EventList = () => {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") || "";
    }

    return "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });
  const [events, setEvents] = useState<EventProps[]>([]);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / 10);

  class Functions {
    setCurrentPage = (page: number) => {
      const url = new URL(window.location.toString());
      url.searchParams.set("page", String(page));
      window.history.pushState({}, "", url);
      setPage(page);
    };

    setCurrentSearch = (search: string) => {
      const url = new URL(window.location.toString());
      url.searchParams.set("search", search);
      window.history.pushState({}, "", url);
      setSearch(search);
      this.setCurrentPage(1);
    };

    FirstPage = () => {
      this.setCurrentPage(1);
    };

    PreviousPage = () => {
      if (page <= 1) return this.setCurrentPage(1);
      this.setCurrentPage(page - 1);
    };

    NextPage = () => {
      if (page >= totalPages) return this.setCurrentPage(totalPages);
      this.setCurrentPage(page + 1);
    };

    LastPage = () => {
      this.setCurrentPage(totalPages);
    };

    onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
      this.setCurrentSearch(event.target.value);
      setPage(1);
    };
  }

  const { onSearchInputChanged, FirstPage, PreviousPage, NextPage, LastPage } =
    new Functions();

  useEffect(() => {
    const url = new URL("http://localhost:3333/events");

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    url.searchParams.set("pageIndex", String(page - 1));

    fetch(url)
      .then((response) => response.json())
      .then(({ events, total }) => {
        setEvents(events);
        setTotal(total);
      });
  }, [page, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center">
          <Search className="w-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            value={search}
            className="bg-transparent flex-1 px-3 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar evento"
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader>
              <input
                type="checkbox"
                className="size-4 bg-black/20 border border-white/10 rounded"
              />
            </TableHeader>
            <TableHeader>ID</TableHeader>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Detalhes</TableHeader>
            <TableHeader>Inscritos</TableHeader>
            <TableHeader>Lançado</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {events.map(
            ({
              id,
              title,
              slug,
              details,
              attendeesAmout,
              maximumAttendees,
              createdAt,
            }) => {
              return (
                <TableRow
                  className="border-b border-white/10 hover:bg-white/5"
                  key={id}
                >
                  <TableCell style={{ width: "48px" }}>
                    <input
                      type="checkbox"
                      className="size-4 bg-transparent border border-white/10 rounded"
                    />
                  </TableCell>
                  <TableCell
                    style={{ width: "50px" }}
                    className="text-nowrap overflow-hidden text-ellipsis"
                  >
                    {id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{title}</span>
                      <span className="lowercase">{slug}</span>
                    </div>
                  </TableCell>
                  <TableCell>{details}</TableCell>
                  <TableCell>
                    {
                      <span>
                        {attendeesAmout} de {maximumAttendees}
                      </span>
                    }
                  </TableCell>
                  <TableCell>{dayjs().to(createdAt)}</TableCell>
                  <TableCell style={{ width: "64px" }}>
                    <IconButton transparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              {" "}
              Mostrando {events.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Pagina {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton
                    onClick={FirstPage}
                    transparent={page === 1}
                    disabled={page === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={PreviousPage}
                    transparent={page === 1}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={NextPage}
                    transparent={page === totalPages}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={LastPage}
                    transparent={page === totalPages}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};
