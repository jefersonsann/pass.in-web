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
import { UserProps } from "../@types/user-props";
import { IconButton } from "./icon-button";
import { Table } from "./table";
import { TableCell } from "./table/table-cell";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const AttendeeList = () => {
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
  const [attendees, setAttendees] = useState<UserProps[]>([]);
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
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    if (search.length > 0) {
      url.searchParams.set("query", search);
    }

    url.searchParams.set("pageIndex", String(page - 1));

    fetch(url)
      .then((response) => response.json())
      .then(({ attendees, total }) => {
        setAttendees(attendees);
        setTotal(total);
      });
  }, [page, search]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center">
          <Search className="w-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            value={search}
            className="bg-transparent flex-1 px-3 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar participantes"
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
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map(({ id, name, email, createdAt, checkedInAt }) => {
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
                    <span className="font-semibold text-white">{name}</span>
                    <span className="lowercase">{email}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(createdAt)}</TableCell>
                <TableCell>
                  {checkedInAt ? (
                    dayjs().to(checkedInAt)
                  ) : (
                    <span className="opacity-40">Ainda não fez check-in</span>
                  )}
                </TableCell>
                <TableCell style={{ width: "64px" }}>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              {" "}
              Mostrando {attendees.length} de {total} itens
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
