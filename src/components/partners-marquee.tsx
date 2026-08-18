import { partners } from "@/data/site";
import { Reveal } from "@/lib/reveal";

export function PartnersMarquee() {
  const row = [...partners, ...partners];

  return (
    <section id="lenders" className="border-y border-border bg-card py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Banks in our network</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold text-foreground sm:text-4xl">
            50+ lending partners, one application
          </h2>
        </Reveal>
      </div>

      <div className="marquee-mask mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 px-4">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-16 w-52 shrink-0 items-center justify-center rounded-2xl border border-border bg-background px-4 text-center text-sm font-bold text-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
