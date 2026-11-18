import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F4] text-[#252B28]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#E8EAE5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#626B65] md:flex">
            <a href="#features" className="transition hover:text-[#315C4C]">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-[#315C4C]">
              How it works
            </a>
            <a href="#about" className="transition hover:text-[#315C4C]">
              About
            </a>
          </nav>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-[#315C4C] px-5 py-2.5 text-sm font-semibold !text-white shadow-sm transition hover:bg-[#25483B]"
          >
            Login <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 lg:px-10 lg:py-28">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#DCE7DF] bg-[#EDF3EF] px-4 py-2 text-sm font-medium text-[#315C4C]">
            <span className="h-2 w-2 rounded-full bg-[#315C4C]" />
            Smarter clinic appointments
          </div>

          <h2 className="max-w-xl text-4xl font-bold leading-[1.15] tracking-tight text-[#252B28] sm:text-5xl lg:text-6xl">
            Better care begins with
            <span className="text-[#315C4C]"> better scheduling.</span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-[#737C75]">
            MedSlot makes clinic appointments simple. Book appointments,
            manage patient visits, and access prescriptions through one
            organized platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-3 rounded-lg bg-[#315C4C] px-7 py-3.5 text-sm font-semibold !text-white shadow-md transition hover:bg-[#25483B]"
            >
              Get Started <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="inline-flex items-center rounded-lg border border-[#D9DED9] bg-white px-7 py-3.5 text-sm font-semibold !text-[#315C4C] transition hover:bg-[#EDF3EF]"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#737C75]">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#315C4C]" />
              Simple appointment booking
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#315C4C]" />
              Organized patient records
            </span>
          </div>
        </div>

        {/* APPOINTMENT PREVIEW CARD */}
        <div className="relative">
          <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-[#E4ECE5] blur-2xl" />
          <div className="absolute -bottom-5 -right-5 h-40 w-40 rounded-full bg-[#E4ECE5] blur-2xl" />

          <div className="relative rounded-2xl border border-[#E8EAE5] bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-center justify-between border-b border-[#EEF0EC] pb-5">
              <div>
                <p className="text-sm text-[#858B85]">Appointment overview</p>
                <h3 className="mt-1 text-xl font-bold text-[#252B28]">
                  Today's schedule
                </h3>
              </div>

              <div className="rounded-xl bg-[#EDF3EF] p-3 text-[#315C4C]">
                <CalendarDays size={24} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-[#F7F7F4] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2EAE3] font-semibold text-[#315C4C]">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-[#252B28]">
                      Patient appointment
                    </p>
                    <p className="mt-1 text-xs text-[#858B85]">
                      General consultation
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#EDF3EF] px-3 py-1 text-xs font-semibold text-[#315C4C]">
                  Confirmed
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-[#E8EAE5] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0EB] font-semibold text-[#626B65]">
                    B
                  </div>
                  <div>
                    <p className="font-semibold text-[#252B28]">
                      Patient appointment
                    </p>
                    <p className="mt-1 text-xs text-[#858B85]">
                      Follow-up consultation
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[#F3F3EF] px-3 py-1 text-xs font-semibold text-[#737C75]">
                  Upcoming
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-[#EDF3EF] p-4">
                <Clock3 size={20} className="text-[#315C4C]" />
                <p className="mt-3 text-2xl font-bold text-[#25483B]">
                  30 min
                </p>
                <p className="mt-1 text-xs text-[#737C75]">
                  Appointment slots
                </p>
              </div>

              <div className="rounded-xl bg-[#F7F7F4] p-4">
                <ClipboardList size={20} className="text-[#315C4C]" />
                <p className="mt-3 text-2xl font-bold text-[#25483B]">
                  Simple
                </p>
                <p className="mt-1 text-xs text-[#737C75]">
                  Patient records
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-[#9A9F99]">
              A simpler way to manage clinic appointments
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="border-y border-[#E8EAE5] bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-[#315C4C]">
              What MedSlot offers
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#252B28] sm:text-4xl">
              Everything organized in one place.
            </h2>
            <p className="mt-4 leading-7 text-[#858B85]">
              Designed to make appointment management easier for both patients
              and clinic receptionists.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: CalendarDays,
                title: "Easy Appointment Booking",
                description:
                  "Patients can choose their preferred date and time range and request an available appointment slot.",
              },
              {
                icon: Clock3,
                title: "Smart Slot Allocation",
                description:
                  "The system checks existing appointments and helps prevent overlapping bookings.",
              },
              {
                icon: ClipboardList,
                title: "Digital Prescriptions",
                description:
                  "Completed consultation prescriptions can be recorded by the receptionist and viewed by patients.",
              },
            ].map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#E8EAE5] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF3EF] text-[#315C4C]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#252B28]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#858B85]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[2px] text-[#315C4C]">
                Simple process
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#252B28] sm:text-4xl">
                From booking to consultation, made easier.
              </h2>
              <p className="mt-5 leading-8 text-[#858B85]">
                MedSlot connects the appointment booking process with
                receptionist scheduling and prescription management.
              </p>

              <Link
                href="/login"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#315C4C] px-6 py-3 font-semibold !text-white transition hover:bg-[#25483B]"
              >
                Start using MedSlot <ArrowRight size={17} />
              </Link>
            </div>

            <div className="space-y-5">
              {[
                {
                  number: "01",
                  title: "Patient requests an appointment",
                  text: "The patient enters their details and preferred time range.",
                },
                {
                  number: "02",
                  title: "Receptionist manages the schedule",
                  text: "The appointment list helps the receptionist organize patient visits.",
                },
                {
                  number: "03",
                  title: "Prescription becomes available",
                  text: "After consultation, the prescription can be added to the patient's portal.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-xl border border-[#E8EAE5] bg-white p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#315C4C] text-sm font-bold text-white">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#252B28]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#858B85]">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / CTA */}
      <section id="about" className="px-6 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#25483B] px-7 py-14 text-center sm:px-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Stethoscope size={27} />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
            A more organized clinic starts here.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
            Make appointment scheduling and patient follow-ups simpler with
            MedSlot.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 font-semibold !text-[#25483B] transition hover:bg-[#EDF3EF]"
          >
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8EAE5] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-7 text-sm text-[#858B85] sm:flex-row lg:px-10">
          <div className="flex items-center gap-2 font-bold text-[#315C4C]">
            <HeartPulse size={18} />
            MedSlot
          </div>
          <p>© 2026 MedSlot. Simplifying clinic management.</p>
        </div>
      </footer>
    </main>
  );
}