"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  CalendarDays,
  Download,
  FileText,
  CheckCircle2,
  Pill,
} from "lucide-react";

import AppShell from "@/components/AppShell";

export default function PatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("medslotUser") || "null"
    );

    const appointments = JSON.parse(
      localStorage.getItem("medslotAppointments") || "[]"
    );

    if (user) {
      const patientPrescriptions = appointments
        .filter(
          (appointment) =>
            appointment.phone === user.phone &&
            appointment.status === "Completed" &&
            appointment.prescription?.trim()
        )
        .sort((a, b) => {
          const first = `${b.date} ${b.time}`;
          const second = `${a.date} ${a.time}`;
          return first.localeCompare(second);
        });

      setPrescriptions(patientPrescriptions);
    }
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "Date unavailable";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  function downloadPrescription(appointment) {
    const content = `
MEDSLOT
PATIENT PRESCRIPTION

Patient Name: ${appointment.patientName}
Appointment ID: ${appointment.id}
Consultation Date: ${formatDate(appointment.date)}

----------------------------------------

PRESCRIPTION

${appointment.prescription}

----------------------------------------

This prescription was entered into the MedSlot system by the clinic receptionist based on the doctor's instructions.
    `;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Prescription-${appointment.id}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <AppShell
      role="patient"
      title="My Prescriptions"
      subtitle="Access your consultation prescriptions"
    >
      <div className="mx-auto max-w-6xl space-y-7">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#252B28]">
            My Prescriptions
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#858B85]">
            View and download prescriptions from your completed consultations.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
              <ClipboardList size={22} />
            </div>

            <p className="mt-4 text-3xl font-bold text-[#252B28]">
              {prescriptions.length}
            </p>

            <p className="mt-1 text-sm text-[#858B85]">
              Available prescriptions
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8EAE5] bg-white p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0F0EB] text-[#626B65]">
              <CheckCircle2 size={22} />
            </div>

            <p className="mt-4 text-3xl font-bold text-[#252B28]">
              {prescriptions.length}
            </p>

            <p className="mt-1 text-sm text-[#858B85]">
              Completed consultations with prescriptions
            </p>
          </div>
        </div>

        {/* PRESCRIPTION LIST */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#252B28]">
              Prescription history
            </h2>

            <span className="text-sm text-[#858B85]">
              {prescriptions.length} records
            </span>
          </div>

          {prescriptions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DDE2DC] bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF3EF] text-[#315C4C]">
                <FileText size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#252B28]">
                No prescriptions available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#858B85]">
                Prescriptions will appear here after your consultation is
                completed and the clinic adds your doctor's instructions.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {prescriptions.map((appointment) => (
                <div
                  key={appointment.id}
                  className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white shadow-sm"
                >
                  {/* CARD HEADER */}
                  <div className="flex flex-col justify-between gap-4 border-b border-[#E8EAE5] bg-[#FCFCFA] p-5 sm:flex-row sm:items-center sm:px-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                        <FileText size={23} />
                      </div>

                      <div>
                        <h3 className="font-bold text-[#252B28]">
                          Consultation Prescription
                        </h3>
                        <p className="mt-1 text-xs text-[#858B85]">
                          ID: {appointment.id}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#EDF3EF] px-3 py-1.5 text-xs font-semibold text-[#315C4C]">
                      <CheckCircle2 size={14} />
                      Completed
                    </span>
                  </div>

                  {/* CARD BODY */}
                  <div className="space-y-5 p-5 sm:p-6">
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      <div>
                        <p className="text-xs text-[#858B85]">
                          Patient name
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#414943]">
                          {appointment.patientName}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#858B85]">
                          Consultation date
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#414943]">
                          <CalendarDays
                            size={15}
                            className="text-[#315C4C]"
                          />
                          {formatDate(appointment.date)}
                        </p>
                      </div>
                    </div>

                    {/* PRESCRIPTION CONTENT */}
                    <div className="rounded-xl border border-[#E8EAE5] bg-[#FAFBF9] p-5">
                      <div className="mb-4 flex items-center gap-2">
                        <Pill size={18} className="text-[#315C4C]" />
                        <h4 className="text-sm font-bold text-[#315C4C]">
                          Doctor's prescription
                        </h4>
                      </div>

                      <p className="whitespace-pre-wrap text-sm leading-7 text-[#414943]">
                        {appointment.prescription}
                      </p>
                    </div>

                    {/* DOWNLOAD */}
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <p className="text-xs text-[#858B85]">
                        Keep a copy of your prescription for future reference.
                      </p>

                      <button
                        onClick={() => downloadPrescription(appointment)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#315C4C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25483B]"
                      >
                        <Download size={17} />
                        Download prescription
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}