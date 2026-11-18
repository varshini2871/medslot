"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Search,
  ClipboardList,
  Users,
  ArrowRight,
  X,
  UserRound,
} from "lucide-react";

import AppShell from "@/components/AppShell";

export default function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
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

  const today = getToday();

  const confirmed = appointments.filter(
    (item) => item.status === "Confirmed"
  );

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  );

  const emergency = appointments.filter(
    (item) => item.emergency && item.status === "Confirmed"
  );

  const upcoming = confirmed.filter(
    (item) => item.date >= today
  );

  const uniquePatients = new Set(
    appointments.map((item) => item.phone)
  ).size;

  const filteredAppointments = appointments.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.patientName?.toLowerCase().includes(query) ||
      item.phone?.includes(query) ||
      item.reason?.toLowerCase().includes(query)
    );
  });

  function getToday() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatDate(dateString) {
    if (!dateString) return "—";

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
    if (!time) return "—";

    const [hours, minutes] = time.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes);

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function openAppointment(appointment) {
    setSelected(appointment);
    setPrescription(appointment.prescription || "");
  }

  function completeAppointment() {
    if (!selected || !prescription.trim()) return;

    const updated = appointments.map((item) =>
      item.id === selected.id
        ? {
            ...item,
            status: "Completed",
            prescription: prescription.trim(),
          }
        : item
    );

    localStorage.setItem(
      "medslotAppointments",
      JSON.stringify(updated)
    );

    setAppointments(updated);
    setSelected(null);
    setPrescription("");
  }

  const stats = [
    {
      title: "Total appointments",
      value: appointments.length,
      description: "All booked appointments",
      icon: CalendarDays,
    },
    {
      title: "Upcoming appointments",
      value: upcoming.length,
      description: "Confirmed, from today onward",
      icon: Clock3,
    },
    {
      title: "Completed consultations",
      value: completed.length,
      description: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Emergency requests",
      value: emergency.length,
      description: "Require receptionist attention",
      icon: AlertCircle,
      emergency: true,
    },
  ];

  return (
    <AppShell
      role="receptionist"
      title="Dashboard"
      subtitle="Clinic overview and appointment management"
    >
      <div className="mx-auto max-w-7xl space-y-8">

        {/* WELCOME */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-[#315C4C]">
              RECEPTIONIST PORTAL
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#252B28]">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-[#858B85]">
              Manage appointments and keep track of patient consultations.
            </p>
          </div>

          <Link
            href="/receptionist/appointments"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#315C4C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25483B]"
          >
            View appointments
            <ArrowRight size={17} />
          </Link>
        </section>

        {/* STATISTICS */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-[#E8EAE5] bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#737C75]">
                    {stat.title}
                  </p>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      stat.emergency
                        ? "bg-red-50 text-[#B94B4B]"
                        : "bg-[#EDF3EF] text-[#315C4C]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-5 text-3xl font-bold text-[#252B28]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-[#858B85]">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* QUICK LINKS */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#252B28]">
              Quick access
            </h2>

            <p className="mt-1 text-sm text-[#858B85]">
              Navigate to important sections of the portal.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Appointments",
                description: "View and manage scheduled visits.",
                icon: CalendarDays,
                href: "/receptionist/appointments",
              },
              {
                title: "Patients",
                description: "Access patient information and history.",
                icon: Users,
                href: "/receptionist/patients",
              },
              {
                title: "Prescriptions",
                description: "View completed consultation prescriptions.",
                icon: ClipboardList,
                href: "/receptionist/prescriptions",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  href={item.href}
                  key={item.title}
                  className="group rounded-2xl border border-[#E8EAE5] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                      <Icon size={21} />
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-[#A0A69F] transition group-hover:translate-x-1 group-hover:text-[#315C4C]"
                    />
                  </div>

                  <h3 className="mt-5 font-bold text-[#252B28]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#858B85]">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* APPOINTMENT TABLE */}
        <section className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-[#E8EAE5] p-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-[#252B28]">
                Appointment schedule
              </h2>

              <p className="mt-1 text-sm text-[#858B85]">
                Patients and their scheduled consultation times.
              </p>
            </div>

            <Link
              href="/receptionist/appointments"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#315C4C] transition hover:text-[#25483B]"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* SEARCH */}
          <div className="border-b border-[#E8EAE5] p-5 sm:px-6">
            <div className="relative max-w-sm">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
              />

              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-[#DDE2DC] py-2.5 pl-10 pr-4 text-sm text-[#252B28] outline-none placeholder:text-[#A0A69F] focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
              />
            </div>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <CalendarDays
                size={32}
                className="mx-auto text-[#A0A69F]"
              />

              <h3 className="mt-4 font-semibold text-[#252B28]">
                No appointments found
              </h3>

              <p className="mt-2 text-sm text-[#858B85]">
                New patient bookings will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-[#F7F7F4] text-xs uppercase tracking-wide text-[#858B85]">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EEF0EC]">
                  {filteredAppointments.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-[#FAFBF9]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDF3EF] font-bold text-[#315C4C]">
                            {item.patientName?.charAt(0)?.toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-[#252B28]">
                              {item.patientName}
                            </p>

                            <p className="mt-1 text-xs text-[#858B85]">
                              {item.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-[#414943]">
                        {formatDate(item.date)}
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#414943]">
                        {formatTime(item.time)}
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
                          onClick={() => openAppointment(item)}
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

          <div className="border-t border-[#E8EAE5] px-6 py-4">
            <p className="text-xs text-[#858B85]">
              Showing {filteredAppointments.length} of {appointments.length} appointments
            </p>
          </div>
        </section>
      </div>

      {/* APPOINTMENT DETAILS MODAL */}
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
                className="rounded-lg p-2 text-[#858B85] transition hover:bg-[#F7F7F4]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              {/* PATIENT DETAILS */}
              <div className="rounded-xl bg-[#F7F7F4] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF3EF] text-[#315C4C]">
                    <UserRound size={21} />
                  </div>

                  <div>
                    <p className="font-bold text-[#252B28]">
                      {selected.patientName}
                    </p>

                    <p className="mt-1 text-sm text-[#858B85]">
                      {selected.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#858B85]">Age</p>
                    <p className="mt-1 text-sm font-semibold text-[#414943]">
                      {selected.age}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#858B85]">Gender</p>
                    <p className="mt-1 text-sm font-semibold text-[#414943]">
                      {selected.gender}
                    </p>
                  </div>
                </div>
              </div>

              {/* APPOINTMENT DETAILS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#858B85]">Appointment date</p>
                  <p className="mt-1 text-sm font-semibold text-[#414943]">
                    {formatDate(selected.date)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-[#858B85]">Appointment time</p>
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
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
                  <AlertCircle size={18} />
                  Emergency request flagged
                </div>
              )}

              {/* PRESCRIPTION */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Doctor's prescription
                </label>

                <textarea
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  rows={4}
                  placeholder="Enter prescription based on the doctor's instructions..."
                  disabled={selected.status === "Completed"}
                  className="w-full rounded-lg border border-[#DDE2DC] p-3 text-sm text-[#252B28] outline-none placeholder:text-[#A0A69F] focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10 disabled:bg-[#F7F7F4]"
                />
              </div>

              {selected.status === "Confirmed" ? (
                <button
                  onClick={completeAppointment}
                  disabled={!prescription.trim()}
                  className="w-full rounded-lg bg-[#315C4C] py-3.5 text-sm font-semibold text-white transition hover:bg-[#25483B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Mark consultation completed
                </button>
              ) : (
                <div className="rounded-lg bg-[#EDF3EF] p-4 text-sm font-medium text-[#315C4C]">
                  <CheckCircle2 className="mr-2 inline" size={17} />
                  Consultation completed
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}