import { BadgeIndianRupee, ClipboardList, FileSearch, Landmark } from "lucide-react";
import { useLead } from "@/components/lead-modal";
import { Reveal } from "@/lib/reveal";

const steps = [
  {
    icon: ClipboardList,
    title: "Submit application",
    body: "Tell us your requirement online or on a call. We check eligibility across the panel.",
  },
  {
    icon: FileSearch,
    title: "Document verification",
    body: "Doorstep pickup and full documentation assistance, legal and insurance guidance included.",
  },
  {
    icon: Landmark,
    title: "Bank sanction",
    body: "We negotiate rate and fees, then place your file with the lender offering the best terms.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Disbursal",
    body: "Loan agreement signing and coordinated fund transfer straight to your account.",
  },
];

export function HowItWorks() {
  const { open } = useLead();

  return (
    <section id="process" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">How we do it</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-foreground sm:text-4xl">
            Four steps from enquiry to money in the bank
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 110} as="li">
              <div className="relative h-full surface-card p-6">
                <span className="absolute right-5 top-5 text-4xl font-extrabold text-secondary">
                  {i + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-brand-bg text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-10 grid gap-6 rounded-3xl bg-card p-8 shadow-[var(--shadow-card)] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:p-10">
            <div className="min-w-0">
              <h3 className="text-2xl font-extrabold text-foreground">Ready for a loan?</h3>
              <p className="mt-2 text-muted-foreground">
                Apply here and unlock your financial goals — expert guidance, zero obligation.
              </p>
            </div>
            <button
              onClick={() => open()}
              className="rounded-xl gradient-brand-bg px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
            >
              Request a call back
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
