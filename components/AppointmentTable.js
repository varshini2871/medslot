"use client";

import { Eye, CheckCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function AppointmentTable({
  appointments = [],
  onView,
  onComplete,
}) {
  if (appointments.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <p className="font-medium text-slate-700">
          No appointments found.
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Appointments will appear here when patients book a slot.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-5 py-4">Patient</th>
            <th className="px-5 py-4">Date</th>
            <th className="px-5 py-4">Time</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="transition hover:bg-slate-50"
            >
              <td className="px-5 py-4">
                <p className="font-semibold text-slate-800">
                  {appointment.patientName}
                </p>

                <p className="text-xs text-slate-500">
                  {appointment.phone}
                </p>
              </td>

              <td className="px-5 py-4 text-slate-600">
                {appointment.date}
              </td>

              <td className="px-5 py-4 text-slate-600">
                {appointment.time}
              </td>

              <td className="px-5 py-4">
                <StatusBadge status={appointment.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onView?.(appointment)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View appointment"
                  >
                    <Eye size={19} />
                  </button>

                  {appointment.status === "Confirmed" && (
                    <button
                      onClick={() => onComplete?.(appointment)}
                      className="text-green-600 hover:text-green-800"
                      title="Complete appointment"
                    >
                      <CheckCircle size={19} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}