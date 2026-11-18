"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  Clock,
  FileText,
  ArrowRight,
  Plus,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";

export default function PatientDashboard() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("medslotUser") || "null"
    );

    const storedAppointments = JSON.parse(
      localStorage.getItem("medslotAppointments") || "[]"
    );

    setUser(storedUser);

    if (storedUser) {
      const patientAppointments = storedAppointments.filter(
        (appointment) => appointment.phone === storedUser.phone
      );

      setAppointments(patientAppointments);
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const upcoming = appointments
    .filter(
      (appointment) =>
        appointment.status === "Confirmed" &&
        appointment.date >= today
    )
    .sort((a, b) => {
      const dateA = `${a.date} ${a.time}`;
      const dateB = `${b.date} ${b.time}`;
      return dateA.localeCompare(dateB);
    });

  const completed = appointments.filter(
    (appointment) => appointment.status === "Completed"
  );

  const prescriptions = appointments.filter(
    (appointment) =>
      appointment.status === "Completed" &&
      appointment.prescription
  );

  const nextAppointment = upcoming[0];

  return (
    <AppShell
      role="patient"
      title="Overview"
      subtitle="Your personal appointment dashboard"
    >

      {/* WELCOME */}

      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#252B28]">
            Hello, {user?.name || "Patient"}
          </h2>

          <p className="mt-2 text-sm text-[#858B85]">
            Here's an overview of your clinic activity.
          </p>
        </div>

        <Link
          href="/patient/book"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#315C4C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25483B]"
        >
          <Plus size={17} />
          Book appointment
        </Link>

      </div>


      {/* STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="Total appointments"
          value={appointments.length}
          description="All your appointments"
        />

        <StatCard
          title="Upcoming appointments"
          value={upcoming.length}
          description="Confirmed visits"
        />

        <StatCard
          title="Completed consultations"
          value={completed.length}
          description="Previous consultations"
        />

      </div>


      {/* UPCOMING APPOINTMENT */}

      <section className="mt-9">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="text-base font-bold text-[#252B28]">
            Next appointment
          </h3>

          <Link
            href="/patient/appointments"
            className="text-xs font-semibold text-[#315C4C] hover:underline"
          >
            View all
          </Link>

        </div>


        {nextAppointment ? (

          <div className="rounded-lg border border-[#E8EAE5] bg-white p-6">

            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

              <div>

                <StatusBadge status={nextAppointment.status} />

                <p className="mt-4 text-lg font-bold text-[#252B28]">
                  {new Date(
                    `${nextAppointment.date}T00:00:00`
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <div className="mt-3 flex flex-wrap gap-5 text-sm text-[#858B85]">

                  <span className="flex items-center gap-2">
                    <Clock size={15} />
                    {nextAppointment.time}
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    Clinic appointment
                  </span>

                </div>

              </div>

              <Link
                href="/patient/appointments"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#315C4C]"
              >
                Appointment details
                <ArrowRight size={16} />
              </Link>

            </div>

          </div>

        ) : (

          <div className="rounded-lg border border-[#E8EAE5] bg-white px-6 py-12 text-center">

            <CalendarDays
              size={28}
              className="mx-auto text-[#858B85]"
            />

            <h4 className="mt-4 text-sm font-bold text-[#252B28]">
              No upcoming appointments
            </h4>

            <p className="mt-2 text-xs text-[#858B85]">
              Book an appointment to see your next visit here.
            </p>

            <Link
              href="/patient/book"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-[#315C4C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#25483B]"
            >
              Book appointment
              <ArrowRight size={15} />
            </Link>

          </div>

        )}

      </section>


      {/* RECENT ACTIVITY */}

      <section className="mt-9">

        <div className="mb-4 flex items-center justify-between">

          <h3 className="text-base font-bold text-[#252B28]">
            Recent appointments
          </h3>

          <Link
            href="/patient/appointments"
            className="text-xs font-semibold text-[#315C4C] hover:underline"
          >
            View history
          </Link>

        </div>

        <div className="overflow-hidden rounded-lg border border-[#E8EAE5] bg-white">

          {appointments.length > 0 ? (

            [...appointments]
              .sort((a, b) => {
                return `${b.date} ${b.time}`.localeCompare(
                  `${a.date} ${a.time}`
                );
              })
              .slice(0, 4)
              .map((appointment) => (

                <div
                  key={appointment.id}
                  className="flex flex-col justify-between gap-3 border-b border-[#E8EAE5] px-5 py-4 last:border-0 sm:flex-row sm:items-center"
                >

                  <div>
                    <p className="text-sm font-semibold text-[#252B28]">
                      {new Date(
                        `${appointment.date}T00:00:00`
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="mt-1 text-xs text-[#858B85]">
                      {appointment.time}
                    </p>
                  </div>

                  <StatusBadge status={appointment.status} />

                </div>

              ))

          ) : (

            <p className="px-5 py-10 text-center text-sm text-[#858B85]">
              Your appointment history will appear here.
            </p>

          )}

        </div>

      </section>


      {/* PRESCRIPTIONS */}

      <section className="mt-9 rounded-lg border border-[#E8EAE5] bg-white p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="rounded-md bg-[#EDF3EF] p-3 text-[#315C4C]">
              <FileText size={20} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#252B28]">
                Prescriptions
              </h3>

              <p className="mt-1 text-xs text-[#858B85]">
                {prescriptions.length} available prescription(s)
              </p>
            </div>

          </div>

          <Link
            href="/patient/prescriptions"
            className="text-xs font-semibold text-[#315C4C] hover:underline"
          >
            View
          </Link>

        </div>

      </section>

    </AppShell>
  );
}