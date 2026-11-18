"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  UserRound,
  ClipboardList,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import AppShell from "@/components/AppShell";
import { allocateSlot } from "@/utils/slotAllocation";

const initialForm = {
  patientName: "",
  phone: "",
  age: "",
  gender: "",
  date: "",
  fromTime: "09:00",
  untilTime: "12:00",
  reason: "",
  emergency: false,
};

export default function BookAppointment() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("medslotUser") || "null"
    );

    setUser(savedUser);

    if (savedUser) {
      setForm((previous) => ({
        ...previous,
        patientName: savedUser.name || "",
        phone: savedUser.phone || "",
      }));
    }
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!user) {
      setError("Please log in before booking an appointment.");
      return;
    }

    if (
      !form.patientName.trim() ||
      !form.phone.trim() ||
      !form.age ||
      !form.gender ||
      !form.date ||
      !form.reason.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (Number(form.age) < 1 || Number(form.age) > 120) {
      setError("Please enter a valid age.");
      return;
    }

    if (form.date < getToday()) {
      setError("Please select today or a future date.");
      return;
    }

    if (form.fromTime >= form.untilTime) {
      setError("The preferred end time must be after the start time.");
      return;
    }

    const appointments = JSON.parse(
      localStorage.getItem("medslotAppointments") || "[]"
    );

    setLoading(true);

    const slot = allocateSlot(
      appointments,
      form.date,
      form.fromTime,
      form.untilTime
    );

    if (!slot) {
      setError(
        "No available appointment slot was found in your selected time range. Please choose another time range."
      );
      setLoading(false);
      return;
    }

    const newAppointment = {
      id: `APT-${Date.now()}`,
      patientName: form.patientName.trim(),
      phone: form.phone.trim(),
      age: Number(form.age),
      gender: form.gender,
      date: form.date,
      time: slot,
      reason: form.reason.trim(),
      emergency: form.emergency,
      status: "Confirmed",
      prescription: "",
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);

    localStorage.setItem(
      "medslotAppointments",
      JSON.stringify(appointments)
    );
    alert(
  `Appointment Confirmed Successfully!\n\nPatient: ${form.patientName}\nDate: ${form.date}\nTime: ${slot}\n\nYour appointment has been booked.`
);

    setMessage(
      `Your appointment has been booked successfully for ${form.date} at ${slot}.`
    );

    setForm((previous) => ({
      ...initialForm,
      patientName: previous.patientName,
      phone: previous.phone,
    }));

    setLoading(false);
  }

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <AppShell
      role="patient"
      title="Book Appointment"
      subtitle="Schedule your clinic visit"
    >
      <div className="mx-auto max-w-4xl space-y-7">
        {/* PAGE INTRODUCTION */}
        <div>
          <Link
            href="/patient/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#315C4C] transition hover:text-[#25483B]"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-[#252B28]">
            Book an appointment
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#858B85]">
            Enter your details and preferred time. We'll find an available
            appointment slot for you.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="flex items-start gap-3 rounded-xl border border-[#C9DDCF] bg-[#EDF3EF] p-5">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#315C4C]" />
            <div>
              <p className="font-semibold text-[#25483B]">
                Appointment confirmed
              </p>
              <p className="mt-1 text-sm leading-6 text-[#526B5C]">
                {message}
              </p>
              <Link
                href="/patient/appointments"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#315C4C] hover:text-[#25483B]"
              >
                View my appointments <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 shrink-0 text-red-600" />
            <p className="text-sm leading-6 text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL DETAILS */}
          <section className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#E8EAE5] px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                <UserRound size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#252B28]">
                  Personal information
                </h2>
                <p className="mt-1 text-xs text-[#858B85]">
                  Enter your basic details
                </p>
              </div>
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Full name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="patientName"
                  value={form.patientName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-[#DDE2DC] bg-white px-4 py-3 text-sm text-[#252B28] outline-none transition placeholder:text-[#A0A69F] focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Mobile number <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full rounded-lg border border-[#DDE2DC] bg-white px-4 py-3 text-sm text-[#252B28] outline-none transition placeholder:text-[#A0A69F] focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Age <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  className="w-full rounded-lg border border-[#DDE2DC] bg-white px-4 py-3 text-sm text-[#252B28] outline-none transition placeholder:text-[#A0A69F] focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Gender <span className="text-red-500">*</span>
                </label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#DDE2DC] bg-white px-4 py-3 text-sm text-[#252B28] outline-none transition focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* APPOINTMENT DETAILS */}
          <section className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#E8EAE5] px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                <CalendarDays size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#252B28]">
                  Appointment details
                </h2>
                <p className="mt-1 text-xs text-[#858B85]">
                  Choose your preferred date and time range
                </p>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Preferred date <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  min={getToday()}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#DDE2DC] bg-white px-4 py-3 text-sm text-[#252B28] outline-none transition focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                  required
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#414943]">
                    Available from <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
                    />
                    <input
                      type="time"
                      name="fromTime"
                      min="09:00"
                      max="17:00"
                      value={form.fromTime}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#DDE2DC] bg-white py-3 pl-10 pr-3 text-sm text-[#252B28] outline-none transition focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#414943]">
                    Available until <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
                    />
                    <input
                      type="time"
                      name="untilTime"
                      min="09:00"
                      max="17:00"
                      value={form.untilTime}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#DDE2DC] bg-white py-3 pl-10 pr-3 text-sm text-[#252B28] outline-none transition focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#E0E9E1] bg-[#F5F8F5] p-4">
                <div className="flex items-start gap-3">
                  <Clock3 size={19} className="mt-0.5 text-[#315C4C]" />
                  <div>
                    <p className="text-sm font-semibold text-[#315C4C]">
                      Appointment information
                    </p>
                    <p className="mt-1 text-xs leading-6 text-[#737C75]">
                      Each appointment is 30 minutes. Clinic hours are
                      9:00 AM to 5:00 PM. The system checks existing
                      appointments and assigns an available slot within
                      your selected time range.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VISIT REASON */}
          <section className="overflow-hidden rounded-2xl border border-[#E8EAE5] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#E8EAE5] px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                <ClipboardList size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#252B28]">
                  Reason for visit
                </h2>
                <p className="mt-1 text-xs text-[#858B85]">
                  Briefly describe your reason for consultation
                </p>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#414943]">
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your symptoms or reason for visiting..."
                  className="w-full resize-none rounded-lg border border-[#DDE2DC] bg-white px-4 py-3 text-sm text-[#252B28] outline-none transition placeholder:text-[#A0A69F] focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                  required
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#E8EAE5] p-4 transition hover:bg-[#FAFAF8]">
                <input
                  type="checkbox"
                  name="emergency"
                  checked={form.emergency}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-[#315C4C]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#252B28]">
                    Mark as emergency request
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#858B85]">
                    This flags your request for receptionist attention.
                    It does not replace emergency medical care or clinical
                    triage.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* SUBMIT */}
          <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-[#858B85]">
              Fields marked with <span className="text-red-500">*</span> are
              required.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#315C4C] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#25483B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Booking..." : "Confirm appointment"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}