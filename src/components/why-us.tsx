import { FileCheck2, HandCoins, Scale, Timer, UserRoundCheck, ShieldCheck } from "lucide-react";
import { Reveal } from "@/lib/reveal";

const reasons = [
  {
    icon: FileCheck2,
    title: "Minimal documentation",
    body: "We pre-check your file so lenders ask once — no repeated paperwork loops.",
  },
  {
    icon: Scale,
    title: "Multi-lender comparison",
    body: "Offers compared side by side across 50+ banks and NBFCs before you commit.",
  },
  {
    icon: UserRoundCheck,
    title: "Dedicated loan manager",
    body: "One named person owns your case from login to disbursal — not a call centre.",
  },
  {
    icon: Timer,
    title: "Fast disbursals",
    body: "Sanctions in as fast as 48 hours on complete files, with doorstep pickup.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent process",
    body: "No hidden costs or administrative charges at any step of the journey.",
  },
  {
    icon: HandCoins,
    title: "Better negotiated pricing",
    body: "Lowest running rates and zero-to-minimal processing fees using our panel leverage.",
  },
];

const stats = [
  { value: "2017", label: "Serving borrowers since" },
  { value: "50+", label: "Banks & NBFC partners" },
  { value: "₹1,200 Cr+", label: "Loans facilitated" },
  { value: "4 cities", label: "Mumbai, Thane, Navi Mumbai, Pune" },
];

export function WhyUs() {
  return (
    <section id="why-us" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Why Growth Capital Services</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold text-foreground sm:text-4xl">
          Leading with integrity — your most ethical financial partner
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={(i % 3) * 90}>
            <div className="h-full surface-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                <r.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 grid gap-6 rounded-3xl gradient-hero-bg p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-navy-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-navy-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
