import { ArrowUpRight, FileText } from "lucide-react";
import { products } from "@/data/site";
import { useLead } from "@/components/lead-modal";
import { Reveal } from "@/lib/reveal";

export function ProductsGrid() {
  const { open } = useLead();

  return (
    <section id="products" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Product showcase</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-foreground sm:text-4xl">
            Smart loans, smarter choices
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every product below is sourced across our full lender panel — you see the rate, tenure and
            paperwork upfront.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) * 90}
              className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <article className="flex h-full flex-col surface-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                    {p.rateFrom > 0 ? `${p.rateFrom}%*` : "LTF"}
                  </span>
                </div>

                <dl className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-secondary/70 p-4 text-center">
                  <div>
                    <dt className="text-[11px] text-muted-foreground">Rate p.a.</dt>
                    <dd className="text-sm font-bold text-foreground">
                      {p.rateFrom > 0 ? `${p.rateFrom}–${p.rateTo}%` : "Nil / LTF"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-muted-foreground">Max tenure</dt>
                    <dd className="text-sm font-bold text-foreground">{p.maxTenure}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] text-muted-foreground">Up to</dt>
                    <dd className="text-sm font-bold text-foreground">{p.maxAmount}</dd>
                  </div>
                </dl>

                <ul className="mt-5 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {h}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
                  <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                  {p.documents.join(" · ")}
                </p>

                <button
                  onClick={() => open(p.slug)}
                  className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:border-brand hover:bg-accent hover:text-accent-foreground"
                >
                  Apply Now <ArrowUpRight className="h-4 w-4" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          *Indicative rates. Final pricing is decided by the lender based on profile, credit score and policy.
        </p>
      </div>
    </section>
  );
}
