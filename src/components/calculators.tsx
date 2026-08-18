import { useMemo, useState } from "react";
import { Calculator, GaugeCircle } from "lucide-react";
import { useLead } from "@/components/lead-modal";
import { Reveal } from "@/lib/reveal";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-foreground">{suffix}</span>
      </div>
      <input
        type="range"
        className="mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function EmiCalculator() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(9.25);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, total, schedule } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const emiValue = r === 0 ? amount / n : (amount * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    const totalValue = emiValue * n;
    let balance = amount;
    const rows: { year: number; principal: number; interest: number; balance: number }[] = [];
    for (let y = 1; y <= years; y++) {
      let p = 0;
      let i = 0;
      for (let m = 0; m < 12; m++) {
        const interest = balance * r;
        const principal = emiValue - interest;
        i += interest;
        p += principal;
        balance = Math.max(balance - principal, 0);
      }
      rows.push({ year: y, principal: p, interest: i, balance });
    }
    return {
      emi: emiValue,
      totalInterest: totalValue - amount,
      total: totalValue,
      schedule: rows,
    };
  }, [amount, rate, years]);

  const principalShare = (amount / total) * 100;
  const maxYearly = Math.max(...schedule.map((s) => s.principal + s.interest));

  return (
    <div className="surface-card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-brand-bg text-primary-foreground">
          <Calculator className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold text-foreground">EMI Calculator</h3>
      </div>

      <div className="mt-7 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Slider
            label="Loan amount"
            value={amount}
            min={100000}
            max={50000000}
            step={50000}
            suffix={`₹ ${inr(amount)}`}
            onChange={setAmount}
          />
          <Slider
            label="Interest rate"
            value={rate}
            min={7}
            max={24}
            step={0.05}
            suffix={`${rate.toFixed(2)}% p.a.`}
            onChange={setRate}
          />
          <Slider
            label="Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            suffix={`${years} ${years === 1 ? "year" : "years"}`}
            onChange={setYears}
          />

          <div className="rounded-2xl bg-secondary p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Monthly EMI
            </p>
            <p className="mt-1 text-3xl font-extrabold gradient-text sm:text-4xl">₹ {inr(emi)}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Total interest</p>
                <p className="text-sm font-bold text-foreground">₹ {inr(totalInterest)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total payable</p>
                <p className="text-sm font-bold text-foreground">₹ {inr(total)}</p>
              </div>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-card">
              <div className="h-full gradient-brand-bg" style={{ width: `${principalShare}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Principal {principalShare.toFixed(0)}% · Interest {(100 - principalShare).toFixed(0)}%
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Yearly amortization</p>
          <div className="mt-4 flex h-44 items-end gap-1.5">
            {schedule.map((s) => (
              <div key={s.year} className="flex h-full flex-1 flex-col justify-end" title={`Year ${s.year}`}>
                <div
                  className="w-full rounded-t-sm bg-primary/80"
                  style={{ height: `${(s.interest / maxYearly) * 100}%` }}
                />
                <div
                  className="w-full rounded-b-sm bg-brand"
                  style={{ height: `${(s.principal / maxYearly) * 100}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand" /> Principal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary/80" /> Interest
            </span>
          </div>

          <div className="mt-5 max-h-52 overflow-y-auto rounded-2xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-secondary text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-semibold">Year</th>
                  <th className="px-3 py-2 font-semibold">Principal</th>
                  <th className="px-3 py-2 font-semibold">Interest</th>
                  <th className="px-3 py-2 font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((s) => (
                  <tr key={s.year} className="border-t border-border">
                    <td className="px-3 py-2 font-semibold text-foreground">{s.year}</td>
                    <td className="px-3 py-2 text-muted-foreground">₹{inr(s.principal)}</td>
                    <td className="px-3 py-2 text-muted-foreground">₹{inr(s.interest)}</td>
                    <td className="px-3 py-2 text-muted-foreground">₹{inr(s.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function EligibilityChecker() {
  const { open } = useLead();
  const [step, setStep] = useState(0);
  const [income, setIncome] = useState(75000);
  const [obligations, setObligations] = useState(10000);
  const [employment, setEmployment] = useState("Salaried");

  const multiplier = employment === "Salaried" ? 60 : employment === "Self-employed" ? 52 : 48;
  const eligible = Math.max((income - obligations) * 0.55 * (multiplier / 10), 0);

  return (
    <div id="eligibility" className="surface-card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-brand-bg text-primary-foreground">
          <GaugeCircle className="h-5 w-5" />
        </span>
        <h3 className="text-lg font-bold text-foreground">Instant Eligibility Checker</h3>
      </div>

      <div className="mt-6 flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? "gradient-brand-bg" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {step === 0 && (
          <>
            <p className="text-sm font-semibold text-foreground">Step 1 — Your employment type</p>
            <div className="grid grid-cols-3 gap-2">
              {["Salaried", "Self-employed", "Business"].map((t) => (
                <button
                  key={t}
                  onClick={() => setEmployment(t)}
                  className={`rounded-xl border px-2 py-3 text-xs font-semibold transition ${
                    employment === t
                      ? "border-brand bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <p className="text-sm font-semibold text-foreground">Step 2 — Monthly income</p>
            <Slider
              label="Net monthly income"
              value={income}
              min={15000}
              max={1000000}
              step={5000}
              suffix={`₹ ${inr(income)}`}
              onChange={setIncome}
            />
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm font-semibold text-foreground">Step 3 — Existing EMIs</p>
            <Slider
              label="Current monthly obligations"
              value={obligations}
              min={0}
              max={500000}
              step={2500}
              suffix={`₹ ${inr(obligations)}`}
              onChange={setObligations}
            />
            <div className="rounded-2xl bg-secondary p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Indicative eligibility
              </p>
              <p className="mt-1 text-3xl font-extrabold gradient-text">₹ {inr(eligible)}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Indicative only. Final sanction depends on lender policy, credit bureau score and profile.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="mt-7 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            Back
          </button>
        )}
        <button
          onClick={() => (step < 2 ? setStep(step + 1) : open())}
          className="flex-1 rounded-xl gradient-brand-bg px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
        >
          {step < 2 ? "Next step" : "Apply with this profile"}
        </button>
      </div>
    </div>
  );
}

export function Calculators() {
  return (
    <section id="calculators" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Financial tools</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-foreground sm:text-4xl">
          Run the numbers before you talk to a bank
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <Reveal delay={80}>
          <EmiCalculator />
        </Reveal>
        <Reveal delay={200}>
          <EligibilityChecker />
        </Reveal>
      </div>
    </section>
  );
}
