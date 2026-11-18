"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartPulse, ArrowRight, UserRound, LockKeyhole } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const user = {
      name: name.trim(),
      phone,
      role,
    };

    localStorage.setItem("medslotUser", JSON.stringify(user));

    if (role === "patient") {
      router.push("/patient/dashboard");
    } else {
      router.push("/receptionist/dashboard");
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F7F4] flex items-center justify-center px-5 py-12">

      <div className="w-full max-w-[950px] grid md:grid-cols-2 bg-white border border-[#E8EAE5] rounded-xl overflow-hidden shadow-sm">

        {/* LEFT PANEL */}

        <div className="hidden md:flex flex-col justify-between bg-[#315C4C] p-12 text-white">

          <div className="flex items-center gap-3">
            <HeartPulse size={27} />
            <span className="text-2xl font-bold tracking-tight">
              medslot
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[2px] text-[#D4E2D8]">
              CLINIC MANAGEMENT
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Healthcare appointments,
              <span className="block text-[#D4E2D8]">
                made simpler.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#E0E9E2]">
              A single place to manage appointments,
              coordinate patient visits and organise
              consultation records.
            </p>
          </div>

          <p className="text-xs text-[#D4E2D8]">
            © 2026 Medslot
          </p>

        </div>


        {/* RIGHT PANEL */}

        <div className="px-7 py-12 sm:px-12">

          <div className="mb-10 md:hidden flex items-center gap-2">
            <HeartPulse size={25} className="text-[#315C4C]" />
            <span className="text-xl font-bold text-[#252B28]">
              medslot
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[1.5px] text-[#315C4C]">
            Welcome to Medslot
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#252B28]">
            Sign in
          </h2>

          <p className="mt-2 text-sm text-[#858B85]">
            Enter your details to continue.
          </p>


          {/* ROLE SELECTOR */}

          <div className="mt-8">

            <label className="mb-3 block text-sm font-semibold text-[#252B28]">
              Select your role
            </label>

            <div className="grid grid-cols-2 gap-3">

              {[
                ["patient", "Patient"],
                ["receptionist", "Receptionist"],
              ].map(([value, label]) => (

                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    role === value
                      ? "border-[#315C4C] bg-[#EDF3EF] text-[#315C4C]"
                      : "border-[#E8EAE5] bg-white text-[#858B85] hover:bg-[#F7F7F4]"
                  }`}
                >
                  {label}
                </button>

              ))}

            </div>

          </div>


          {/* FORM */}

          <form onSubmit={handleLogin} className="mt-7 space-y-5">

            <div>

              <label className="mb-2 block text-sm font-semibold text-[#252B28]">
                Full name
              </label>

              <div className="relative">

                <UserRound
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-[#E8EAE5] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                />

              </div>

            </div>


            <div>

              <label className="mb-2 block text-sm font-semibold text-[#252B28]">
                Phone number
              </label>

              <div className="relative">

                <LockKeyhole
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858B85]"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-lg border border-[#E8EAE5] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#315C4C] focus:ring-2 focus:ring-[#315C4C]/10"
                />

              </div>

            </div>


            {error && (
              <p className="text-sm text-[#B94B4B]">
                {error}
              </p>
            )}


            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#315C4C] py-3.5 text-sm font-semibold text-white transition hover:bg-[#25483B]"
            >
              Continue
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="mt-8 text-center text-xs leading-6 text-[#858B85]">
            By continuing, you agree to use Medslot
            responsibly.
          </p>

        </div>

      </div>

    </main>
  );
}