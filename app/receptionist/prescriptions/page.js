"use client";

import { useEffect, useState } from "react";
import {
  ClipboardList,
  Search,
  CalendarDays,
  Download,
  FileText,
  Eye,
  X,
} from "lucide-react";

import AppShell from "@/components/AppShell";

export default function ReceptionistPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("medslotAppointments") || "[]"
    );

    setPrescriptions(
      data.filter(
        (item) =>
          item.status === "Completed" && item.prescription?.trim()
      )
    );
  }, []);

  const filtered = prescriptions.filter(
    (item) =>
      item.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      item.phone?.includes(search) ||
      item.id?.toLowerCase().includes(search.toLowerCase())
  );

  function downloadPrescription(item) {
    const content = `
MEDSLOT
PATIENT PRESCRIPTION

Patient Name: ${item.patientName}
Phone: ${item.phone}
Appointment ID: ${item.id}
Consultation Date: ${item.date}

----------------------------------

PRESCRIPTION

${item.prescription}

----------------------------------
Entered by receptionist based on doctor's instructions.
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `Prescription-${item.id}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <AppShell
      role="receptionist"
      title="Prescriptions"
      subtitle="View and manage completed consultation prescriptions"
    >
      <div className="mx-auto max-w-7xl space-y-7">
        <div>
          <h1 className="text-3xl font-bold text-[#252B28]">
            Prescriptions
          </h1>
          <p className="mt-2 text-sm text-[#858B85]">
            Access prescriptions recorded after completed consultations.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="rounded-2xl border border-[#E8EAE5] bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
              <ClipboardList size={23} />
            </div>

            <div>
              <p className="text-3xl font-bold text-[#252B28]">
                {prescriptions.length}
              </p>
              <p className="mt-1 text-sm text-[#858B85]">
                Total prescriptions recorded
              </p>
            </div>
          </div>
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
              placeholder="Search patient or appointment ID..."
              className="w-full rounded-lg border border-[#DDE2DC] py-3 pl-10 pr-4 text-sm text-[#252B28] outline-none focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
            />
          </div>
        </div>

        {/* PRESCRIPTION LIST */}
        <div className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white">
          <div className="border-b border-[#E8EAE5] px-6 py-5">
            <h2 className="font-bold text-[#252B28]">
              Prescription records
            </h2>
            <p className="mt-1 text-xs text-[#858B85]">
              {filtered.length} records found
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <FileText size={32} className="mx-auto text-[#A0A69F]" />
              <p className="mt-4 font-semibold text-[#252B28]">
                No prescriptions found
              </p>
              <p className="mt-2 text-sm text-[#858B85]">
                Prescriptions will appear after completed consultations.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#EEF0EC]">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-5 p-5 transition hover:bg-[#FAFBF9] sm:flex-row sm:items-center sm:px-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                      <FileText size={21} />
                    </div>

                    <div>
                      <h3 className="font-bold text-[#252B28]">
                        {item.patientName}
                      </h3>

                      <p className="mt-1 text-xs text-[#858B85]">
                        {item.id} · {item.phone}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-xs text-[#626B65]">
                        <CalendarDays size={14} className="text-[#315C4C]" />
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#DDE2DC] px-4 py-2.5 text-sm font-semibold text-[#315C4C] transition hover:bg-[#EDF3EF]"
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      onClick={() => downloadPrescription(item)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#315C4C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#25483B]"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRESCRIPTION MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8EAE5] p-6">
              <div>
                <h2 className="text-xl font-bold text-[#252B28]">
                  Prescription details
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

            <div className="space-y-5 p-6">
              <div className="rounded-xl bg-[#EDF3EF] p-4">
                <p className="text-xs text-[#65786B]">Patient name</p>
                <p className="mt-1 font-bold text-[#25483B]">
                  {selected.patientName}
                </p>
                <p className="mt-1 text-sm text-[#65786B]">
                  {selected.phone}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#858B85]">Consultation date</p>
                <p className="mt-1 text-sm font-semibold text-[#414943]">
                  {selected.date}
                </p>
              </div>

              <div className="rounded-xl border border-[#E8EAE5] bg-[#FAFBF9] p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#315C4C]">
                  <ClipboardList size={18} />
                  Prescription
                </h3>

                <p className="whitespace-pre-wrap text-sm leading-7 text-[#414943]">
                  {selected.prescription}
                </p>
              </div>

              <button
                onClick={() => downloadPrescription(selected)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#315C4C] py-3 text-sm font-semibold text-white transition hover:bg-[#25483B]"
              >
                <Download size={17} />
                Download prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}