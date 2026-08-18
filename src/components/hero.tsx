import { useState } from "react";
import { ArrowRight, BadgeCheck, Building2, ShieldCheck, Timer } from "lucide-react";
import { cities, products } from "@/data/site";
import { useLead } from "@/components/lead-modal";
import { Reveal } from "@/lib/reveal";

const badges = [
  { icon: Building2, label: "50+ Partner Banks & NBFCs" },
  { icon: Timer, label: "Sanctions in as fast as 48 hrs" },
  { icon: ShieldCheck, label: "Zero hidden charges" },
];

export function Hero() {
  const { open } = useLead();
  const [product, setProduct] = useState(products[0]!.slug);
  const [amount, setAmount] = useState("2500000");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState(cities[0]!);
  const [error, setError] = useState("");

  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

  return (
    <section id="top" className="relative overflow-hidden gradient-hero-bg">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 bg-navy-foreground/10 px-3 py-1.5 text-xs font-semibold text-navy-foreground">
              <BadgeCheck className="h-4 w-4" /> Serving Mumbai · Thane · Navi Mumbai · Pune since 2017
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl lg:text-6xl">
              The right loan, from the right lender —{" "}
              <span className="bg-gradient-to-r from-[oklch(0.85_0.13_200)] to-[oklch(0.72_0.15_213)] bg-clip-text text-transparent">
                without the runaround.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
              Growth Capital Services compares offers across 50+ banks and NBFCs, negotiates your rate and
              handles documentation end-to-end — so you sign once and get disbursed fast.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {badges.map((b) => (
                <li
                  key={b.label}
                  className="flex items-center gap-2.5 rounded-2xl border border-navy-foreground/15 bg-navy-foreground/5 px-3.5 py-3"
                >
                  <b.icon className="h-5 w-5 shrink-0 text-[oklch(0.82_0.13_205)]" />
                  <span className="text-xs font-semibold leading-tight text-navy-foreground">{b.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="rounded-3xl bg-card p-6 shadow-[var(--shadow-float)] sm:p-7">
            <h2 className="text-lg font-bold text-foreground">Quick apply</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Share four details — we come back with matched offers.
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Loan type</label>
                <select
                  className={`${field} mt-1.5`}
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-foreground">Desired amount (₹)</label>
                  <input
                    className={`${field} mt-1.5`}
                    inputMode="numeric"
                    maxLength={12}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">City</label>
                  <select className={`${field} mt-1.5`} value={city} onChange={(e) => setCity(e.target.value)}>
                    {cities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Mobile number</label>
                <input
                  className={`${field} mt-1.5`}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                />
                {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
              </div>
              <button
                onClick={() => {
                  if (!/^[6-9]\d{9}$/.test(mobile)) {
                    setError("Enter a valid 10-digit Indian mobile number.");
                    return;
                  }
                  open(product);
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl gradient-brand-bg px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
              >
                Get matched offers <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-xs text-muted-foreground">
                No impact on your credit score for an enquiry.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
