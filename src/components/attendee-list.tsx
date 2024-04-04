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
import { ChangeEvent, useState } from "react";
import { attendees } from "../data/attendees";
import { IconButton } from "./icon-button";
import { Table } from "./table";
import { TableCell } from "./table/table-cell";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export const AttendeeList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(attendees.length / 10);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  class Pagination {
    FirstPage() {
      setPage(1);
    }
    PreviusPage() {
      if (page <= 1) return setPage(1);
      setPage(page - 1);
    }
    NextPage() {
      if (page >= totalPages) return setPage(totalPages);
      setPage(page + 1);
    }
    LastPage() {
      setPage(totalPages);
    }
  }

  const goTo = new Pagination();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center">
          <Search className="w-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            className="bg-transparent flex-1 px-3 outline-none border-0 p-0 text-sm ring-0"
            placeholder="Buscar participantes"
          />
        </div>
        {search}
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
          {attendees
            .slice((page - 1) * 10, page * 10)
            .map(({ id, name, email, createdAt, checkedInAt }) => {
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
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{name}</span>
                      <span>{email.toLowerCase()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(createdAt)}</TableCell>
                  <TableCell>{dayjs().to(checkedInAt)}</TableCell>
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
              Mostrando 10 de {attendees.length} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Pagina {page} de {totalPages}
                </span>

                <div className="flex gap-1.5">
                  <IconButton
                    onClick={goTo.FirstPage}
                    transparent={page === 1}
                    disabled={page === 1}
                  >
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goTo.PreviusPage}
                    transparent={page === 1}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goTo.NextPage}
                    transparent={page === totalPages}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goTo.LastPage}
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
