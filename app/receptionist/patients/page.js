"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Phone,
  CalendarDays,
  X,
  ClipboardList,
} from "lucide-react";

import AppShell from "@/components/AppShell";

export default function ReceptionistPatients() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("medslotAppointments") || "[]"
    );
    setAppointments(data);
  }, []);

  const patients = Object.values(
    appointments.reduce((result, appointment) => {
      const phone = appointment.phone;

      if (!result[phone]) {
        result[phone] = {
          name: appointment.patientName,
          phone,
          age: appointment.age,
          gender: appointment.gender,
          appointments: [],
        };
      }

      result[phone].appointments.push(appointment);
      return result;
    }, {})
  );

  const filtered = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone?.includes(search)
  );

  const completed = appointments.filter(
    (a) => a.status === "Completed"
  ).length;

  return (
    <AppShell
      role="receptionist"
      title="Patients"
      subtitle="View patient information and consultation history"
    >
      <div className="mx-auto max-w-7xl space-y-7">
        <div>
          <h1 className="text-3xl font-bold text-[#252B28]">
            Patients
          </h1>
          <p className="mt-2 text-sm text-[#858B85]">
            Manage patient records and view their appointment history.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total patients", value: patients.length, icon: Users },
            {
              label: "Total appointments",
              value: appointments.length,
              icon: CalendarDays,
            },
            {
              label: "Completed consultations",
              value: completed,
              icon: ClipboardList,
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

        {/* SEARCH */}
        <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient name or phone..."
              className="w-full rounded-lg border border-[#DDE2DC] py-3 pl-10 pr-4 text-sm text-[#252B28] outline-none focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
            />
          </div>
        </div>

        {/* PATIENT TABLE */}
        <div className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white">
          <div className="border-b border-[#E8EAE5] px-6 py-5">
            <h2 className="font-bold text-[#252B28]">Patient directory</h2>
            <p className="mt-1 text-xs text-[#858B85]">
              {filtered.length} patients found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Users size={32} className="mx-auto text-[#A0A69F]" />
              <p className="mt-4 font-semibold text-[#252B28]">
                No patients found
              </p>
              <p className="mt-2 text-sm text-[#858B85]">
                Patient records will appear when appointments are booked.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-[#F7F7F4] text-xs uppercase tracking-wide text-[#858B85]">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Age / Gender</th>
                    <th className="px-6 py-4">Appointments</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EEF0EC]">
                  {filtered.map((patient) => (
                    <tr key={patient.phone} className="hover:bg-[#FAFBF9]">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EDF3EF] font-bold text-[#315C4C]">
                            {patient.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <span className="font-semibold text-[#252B28]">
                            {patient.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <p className="flex items-center gap-2 text-sm text-[#626B65]">
                          <Phone size={15} className="text-[#315C4C]" />
                          {patient.phone}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-[#626B65]">
                        {patient.age} / {patient.gender}
                      </td>

                      <td className="px-6 py-5 text-sm font-semibold text-[#414943]">
                        {patient.appointments.length}
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => setSelected(patient)}
                          className="rounded-lg border border-[#DDE2DC] px-3 py-2 text-xs font-semibold text-[#315C4C] transition hover:bg-[#EDF3EF]"
                        >
                          View profile
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

      {/* PATIENT PROFILE MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8EAE5] p-6">
              <div>
                <h2 className="text-xl font-bold text-[#252B28]">
                  Patient profile
                </h2>
                <p className="mt-1 text-xs text-[#858B85]">
                  Patient information and history
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-[#858B85] hover:bg-[#F7F7F4]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-xl bg-[#EDF3EF] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white font-bold text-[#315C4C]">
                    {selected.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#25483B]">
                      {selected.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#65786B]">
                      {selected.phone}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#65786B]">Age</p>
                    <p className="mt-1 font-semibold text-[#25483B]">
                      {selected.age}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#65786B]">Gender</p>
                    <p className="mt-1 font-semibold text-[#25483B]">
                      {selected.gender}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-bold text-[#252B28]">
                  Appointment history
                </h3>

                <div className="space-y-3">
                  {selected.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="rounded-xl border border-[#E8EAE5] p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[#252B28]">
                          {appointment.id}
                        </p>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            appointment.status === "Completed"
                              ? "bg-[#F0F0EB] text-[#626B65]"
                              : "bg-[#EDF3EF] text-[#315C4C]"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-[#858B85]">
                        {appointment.date} · {appointment.time}
                      </p>

                      <p className="mt-2 text-sm text-[#626B65]">
                        {appointment.reason}
                      </p>

                      {appointment.prescription && (
                        <div className="mt-3 rounded-lg bg-[#F7F7F4] p-3">
                          <p className="text-xs font-semibold text-[#315C4C]">
                            Prescription
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#626B65]">
                            {appointment.prescription}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}