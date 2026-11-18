"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  ClipboardList,
  ArrowRight,
  CalendarPlus,
  Search,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import AppShell from "@/components/AppShell";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("medslotUser") || "null"
    );

    const allAppointments = JSON.parse(
      localStorage.getItem("medslotAppointments") || "[]"
    );

    if (user) {
      const patientAppointments = allAppointments
        .filter((appointment) => appointment.phone === user.phone)
        .sort((a, b) => {
          const first = `${a.date} ${a.time}`;
          const second = `${b.date} ${b.time}`;
          return first.localeCompare(second);
        });

      setAppointments(patientAppointments);
    }
  }, []);

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.reason?.toLowerCase().includes(search.toLowerCase()) ||
      appointment.date?.includes(search);

    const matchesFilter =
      filter === "All" ||
      (filter === "Upcoming" && appointment.status === "Confirmed") ||
      (filter === "Completed" && appointment.status === "Completed") ||
      (filter === "Emergency" && appointment.emergency);

    return matchesSearch && matchesFilter;
  });

  const upcoming = appointments.filter(
    (appointment) =>
      appointment.status === "Confirmed" &&
      appointment.date >= getToday()
  ).length;

  const completed = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  function formatDate(dateString) {
    if (!dateString) return "Date unavailable";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  function formatTime(time) {
    if (!time) return "Time unavailable";

    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function StatusBadge({ status }) {
    const styles = {
      Confirmed: "bg-[#EDF3EF] text-[#315C4C]",
      Completed: "bg-[#F0F0EB] text-[#626B65]",
      Cancelled: "bg-red-50 text-red-700",
    };

    return (
      <span
        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
          styles[status] || "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  }

  return (
    <AppShell
      role="patient"
      title="My Appointments"
      subtitle="View and track your clinic visits"
    >
      <div className="mx-auto max-w-6xl space-y-7">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#252B28]">
              My Appointments
            </h1>
            <p className="mt-2 text-sm text-[#858B85]">
              Keep track of your upcoming and previous consultations.
            </p>
          </div>

          <Link
            href="/patient/book"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#315C4C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25483B]"
          >
            <CalendarPlus size={17} />
            Book Appointment
          </Link>
        </div>

        {/* STATISTICS */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
              <CalendarDays size={20} />
            </div>
            <p className="mt-4 text-3xl font-bold text-[#252B28]">
              {appointments.length}
            </p>
            <p className="mt-1 text-sm text-[#858B85]">
              Total appointments
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
              <Clock3 size={20} />
            </div>
            <p className="mt-4 text-3xl font-bold text-[#252B28]">
              {upcoming}
            </p>
            <p className="mt-1 text-sm text-[#858B85]">
              Upcoming appointments
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0F0EB] text-[#626B65]">
              <CheckCircle2 size={20} />
            </div>
            <p className="mt-4 text-3xl font-bold text-[#252B28]">
              {completed}
            </p>
            <p className="mt-1 text-sm text-[#858B85]">
              Completed consultations
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
              />
              <input
                type="text"
                placeholder="Search by reason or date..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-[#DDE2DC] py-2.5 pl-10 pr-4 text-sm text-[#252B28] outline-none placeholder:text-[#A0A69F] focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Upcoming", "Completed", "Emergency"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    filter === item
                      ? "bg-[#315C4C] text-white"
                      : "border border-[#E8EAE5] bg-white text-[#626B65] hover:bg-[#EDF3EF] hover:text-[#315C4C]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* APPOINTMENT LIST */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#252B28]">
              Appointment history
            </h2>
            <span className="text-sm text-[#858B85]">
              {filteredAppointments.length} results
            </span>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DDE2DC] bg-white px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EDF3EF] text-[#315C4C]">
                <CalendarDays size={26} />
              </div>

              <h3 className="mt-5 font-bold text-[#252B28]">
                No appointments found
              </h3>

              <p className="mt-2 text-sm text-[#858B85]">
                Your appointments will appear here once you book one.
              </p>

              <Link
                href="/patient/book"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#315C4C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25483B]"
              >
                Book an appointment <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="rounded-2xl border border-[#E8EAE5] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                        <CalendarDays size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#252B28]">
                          Doctor Consultation
                        </h3>
                        <p className="mt-1 text-sm text-[#858B85]">
                          Appointment ID: {appointment.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={appointment.status} />

                      {appointment.emergency && (
                        <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          Emergency
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 border-t border-[#EEF0EC] pt-5 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-medium text-[#858B85]">
                        Appointment date
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#414943]">
                        <CalendarDays size={16} className="text-[#315C4C]" />
                        {formatDate(appointment.date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#858B85]">
                        Appointment time
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#414943]">
                        <Clock3 size={16} className="text-[#315C4C]" />
                        {formatTime(appointment.time)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-[#858B85]">
                        Reason for visit
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#414943]">
                        {appointment.reason || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {appointment.status === "Completed" &&
                    appointment.prescription && (
                      <div className="mt-5 flex flex-col justify-between gap-3 rounded-xl bg-[#EDF3EF] p-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <ClipboardList
                            size={19}
                            className="text-[#315C4C]"
                          />
                          <div>
                            <p className="text-sm font-semibold text-[#25483B]">
                              Prescription available
                            </p>
                            <p className="mt-1 text-xs text-[#65786B]">
                              Your consultation prescription is ready.
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/patient/prescriptions"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#315C4C] hover:text-[#25483B]"
                        >
                          View prescription <ArrowRight size={16} />
                        </Link>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}