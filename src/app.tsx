import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AttendeeList } from "./components/attendee-list";
import { EventList } from "./components/event-list";
import { Header } from "./components/header";

export function App() {
  return (
    <div className="max-w-7xl mx-auto py-5 flex flex-col gap-5">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/attendees" element={<AttendeeList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
