"use client";

import { UserRound } from "lucide-react";

export default function Navbar({
  title = "Overview",
  subtitle = "Manage your clinic activities",
  role = "Patient",
}) {
  return (
    <header className="flex min-h-[70px] items-center justify-between border-b border-[#E8EAE5] bg-white px-6 lg:px-9">

      <div>
        <h1 className="text-base font-bold text-[#252B28]">
          {title}
        </h1>

        <p className="mt-1 text-xs text-[#858B85]">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EDF3EF] text-[#315C4C]">
          <UserRound size={18} />
        </div>

        <div className="hidden sm:block">
          <p className="text-xs font-semibold text-[#252B28]">
            {role}
          </p>

          <p className="mt-1 text-[10px] text-[#858B85]">
            Medslot account
          </p>
        </div>

      </div>

    </header>
  );
}