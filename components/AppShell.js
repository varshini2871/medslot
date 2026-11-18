"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell({
  children,
  role = "patient",
  title = "Overview",
  subtitle = "Welcome to Medslot",
}) {
  return (
    <div className="min-h-screen bg-[#F7F7F4] md:flex">

      <Sidebar role={role} />

      <div className="min-w-0 flex-1">

        <Navbar
          title={title}
          subtitle={subtitle}
          role={role === "patient" ? "Patient" : "Receptionist"}
        />

        <main className="ms-content">
          {children}
        </main>

      </div>

    </div>
  );
}