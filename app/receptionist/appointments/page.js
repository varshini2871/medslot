"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Search,
  CheckCircle2,
  X,
  UserRound,
  AlertCircle,
} from "lucide-react";

import AppShell from "@/components/AppShell";

export default function ReceptionistAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [prescription, setPrescription] = useState("");

  function loadAppointments() {
    const data = JSON.parse(
      localStorage.getItem("medslotAppointments") || "[]"
    );

    data.sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
    );

    setAppointments(data);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const filtered = appointments.filter((item) => {
    const matchesSearch =
      item.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      item.phone?.includes(search) ||
      item.reason?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Confirmed" && item.status === "Confirmed") ||
      (filter === "Completed" && item.status === "Completed") ||
      (filter === "Emergency" && item.emergency);

    return matchesSearch && matchesFilter;
  });

  function completeAppointment() {
    if (!selected) return;

    const updated = appointments.map((item) =>
      item.id === selected.id
        ? {
            ...item,
            status: "Completed",
            prescription: prescription.trim(),
          }
        : item
    );

    localStorage.setItem("medslotAppointments", JSON.stringify(updated));
    setAppointments(updated);
    setSelected(null);
    setPrescription("");
  }

  function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatTime(time) {
    if (!time) return "—";
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m);
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <AppShell
      role="receptionist"
      title="Appointments"
      subtitle="Manage and organize patient appointments"
    >
      <div className="mx-auto max-w-7xl space-y-7">
        <div>
          <h1 className="text-3xl font-bold text-[#252B28]">
            Appointments
          </h1>
          <p className="mt-2 text-sm text-[#858B85]">
            View appointment schedules and manage consultations.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total appointments",
              value: appointments.length,
              icon: CalendarDays,
            },
            {
              label: "Confirmed",
              value: appointments.filter((a) => a.status === "Confirmed").length,
              icon: Clock3,
            },
            {
              label: "Completed",
              value: appointments.filter((a) => a.status === "Completed").length,
              icon: CheckCircle2,
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#E8EAE5] bg-white p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                  <Icon size={20} />
                </div>
                <p className="mt-4 text-3xl font-bold text-[#252B28]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#858B85]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* SEARCH AND FILTER */}
        <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients..."
                className="w-full rounded-lg border border-[#DDE2DC] py-3 pl-10 pr-4 text-sm text-[#252B28] outline-none focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Confirmed", "Completed", "Emergency"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    filter === item
                      ? "bg-[#315C4C] text-white"
                      : "border border-[#E8EAE5] bg-white text-[#626B65] hover:bg-[#EDF3EF]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* APPOINTMENT TABLE */}
        <div className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white">
          <div className="border-b border-[#E8EAE5] px-6 py-5">
            <h2 className="font-bold text-[#252B28]">
              Appointment schedule
            </h2>
            <p className="mt-1 text-xs text-[#858B85]">
              {filtered.length} appointments found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <CalendarDays
                size={32}
                className="mx-auto text-[#A0A69F]"
              />
              <p className="mt-4 font-semibold text-[#252B28]">
                No appointments found
              </p>
              <p className="mt-2 text-sm text-[#858B85]">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#F7F7F4] text-xs uppercase tracking-wide text-[#858B85]">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Date & time</th>
                    <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EEF0EC]">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAFBF9]">
                      <td className="px-6 py-5">
                        <p className="font-semibold text-[#252B28]">
                          {item.patientName}
                        </p>
                        <p className="mt-1 text-xs text-[#858B85]">
                          {item.phone}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-[#414943]">
                          {formatDate(item.date)}
                        </p>
                        <p className="mt-1 text-xs text-[#858B85]">
                          {formatTime(item.time)}
                        </p>
                      </td>

                      <td className="max-w-[180px] px-6 py-5 text-sm text-[#626B65]">
                        {item.reason || "Not specified"}
                      </td>

                      <td className="px-6 py-5">
                        {item.emergency ? (
                          <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                            Emergency
                          </span>
                        ) : (
                          <span className="text-xs text-[#858B85]">
                            Normal
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.status === "Completed"
                              ? "bg-[#F0F0EB] text-[#626B65]"
                              : "bg-[#EDF3EF] text-[#315C4C]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => {
                            setSelected(item);
                            setPrescription(item.prescription || "");
                          }}
                          className="rounded-lg border border-[#DDE2DC] px-3 py-2 text-xs font-semibold text-[#315C4C] transition hover:bg-[#EDF3EF]"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8EAE5] p-6">
              <div>
                <h2 className="text-xl font-bold text-[#252B28]">
                  Appointment details
                </h2>
                <p className="mt-1 text-xs text-[#858B85]">
                  {selected.id}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-[#858B85] hover:bg-[#F7F7F4]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-xl bg-[#F7F7F4] p-4">
                <p className="text-xs text-[#858B85]">Patient</p>
                <p className="mt-1 font-semibold text-[#252B28]">
                  {selected.patientName}
                </p>
                <p className="mt-1 text-sm text-[#626B65]">
                  {selected.phone} · Age {selected.age} · {selected.gender}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#858B85]">Date</p>
                  <p className="mt-1 text-sm font-semibold text-[#414943]">
                    {formatDate(selected.date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#858B85]">Time</p>
                  <p className="mt-1 text-sm font-semibold text-[#414943]">
                    {formatTime(selected.time)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-[#858B85]">Reason for visit</p>
                <p className="mt-1 text-sm leading-6 text-[#414943]">
                  {selected.reason}
                </p>
              </div>

              {selected.emergency && (
                <div className="flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle size={18} />
                  Emergency request flagged
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Doctor's prescription
                </label>
                <textarea
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  rows={4}
                  placeholder="Enter the prescription based on the doctor's instructions..."
                  className="w-full rounded-lg border border-[#DDE2DC] p-3 text-sm text-[#252B28] outline-none focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                  disabled={selected.status === "Completed"}
                />
              </div>

              {selected.status === "Confirmed" && (
                <button
                  onClick={completeAppointment}
                  disabled={!prescription.trim()}
                  className="w-full rounded-lg bg-[#315C4C] py-3 text-sm font-semibold text-white transition hover:bg-[#25483B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Mark consultation completed
                </button>
              )}

              {selected.status === "Completed" && (
                <p className="rounded-lg bg-[#EDF3EF] p-3 text-sm text-[#315C4C]">
                  This consultation has already been completed.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}