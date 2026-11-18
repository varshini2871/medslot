"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  LogOut,
  HeartPulse,
} from "lucide-react";

export default function Sidebar({ role = "receptionist" }) {
  const pathname = usePathname();
  const router = useRouter();

  const patientLinks = [
    { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
    { name: "Book Appointment", href: "/patient/book", icon: CalendarDays },
    { name: "My Appointments", href: "/patient/appointments", icon: ClipboardList },
    { name: "Prescriptions", href: "/patient/prescriptions", icon: ClipboardList },
  ];

  const receptionistLinks = [
    { name: "Dashboard", href: "/receptionist/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/receptionist/appointments", icon: CalendarDays },
    { name: "Patients", href: "/receptionist/patients", icon: Users },
    { name: "Prescriptions", href: "/receptionist/prescriptions", icon: ClipboardList },
  ];

  const links = role === "patient" ? patientLinks : receptionistLinks;

  function handleLogout() {
    localStorage.removeItem("medslotUser");
    router.push("/login");
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-[#E8EAE5] bg-white">
      {/* LOGO */}
      <div className="flex h-20 items-center gap-3 border-b border-[#E8EAE5] px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#315C4C] text-white">
          <HeartPulse size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#25483B]">
            MedSlot
          </h1>
          <p className="text-[10px] tracking-[2px] text-[#858B85]">
            CLINIC MANAGEMENT
          </p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-4 py-7">
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-[#9A9F99]">
          {role === "patient" ? "Patient Portal" : "Receptionist Portal"}
        </p>

        <nav className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#EDF3EF] text-[#315C4C]"
                    : "text-[#626B65] hover:bg-[#F7F7F4] hover:text-[#315C4C]"
                }`}
              >
                <Icon size={19} />
                {item.name}

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#315C4C]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#E8EAE5] p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-[#858B85] transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={19} />
          Logout
        </button>

        <p className="mt-4 px-3 text-[11px] text-[#A0A69F]">
          © 2026 MedSlot
        </p>
      </div>
    </aside>
  );
}