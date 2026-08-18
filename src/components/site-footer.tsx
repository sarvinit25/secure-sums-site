import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/gcs-logo.png.asset.json";
import { contact, products } from "@/data/site";
import { Reveal } from "@/lib/reveal";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <Reveal>
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logo.url}
                  alt="Growth Capital Services logo"
                  className="h-12 w-12 rounded-xl bg-navy-foreground object-contain p-1"
                  width={48}
                  height={48}
                />
                <span className="font-display text-base font-extrabold">Growth Capital Services</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
                Established 2017. A partnership firm offering custom-fit loan solutions from leading banks and
                NBFCs across Mumbai, Thane, Navi Mumbai and Pune.
              </p>
              <div className="mt-5 flex gap-3">
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-navy-foreground/20 transition hover:bg-navy-foreground/10"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-navy-foreground/20 transition hover:bg-navy-foreground/10"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              <h3 className="text-sm font-bold">Loan products</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
                {products.map((p) => (
                  <li key={p.slug}>
                    <a href="#products" className="transition hover:text-navy-foreground">
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div>
              <h3 className="text-sm font-bold">Company</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
                {[
                  ["About us", "#why-us"],
                  ["Calculators", "#calculators"],
                  ["Check eligibility", "#eligibility"],
                  ["Partner lenders", "#lenders"],
                  ["How it works", "#process"],
                  ["Privacy policy", "#disclaimer"],
                  ["Terms of use", "#disclaimer"],
                  ["Grievance redressal", "#disclaimer"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="transition hover:text-navy-foreground">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div>
              <h3 className="text-sm font-bold">Customer care</h3>
              <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.82_0.13_205)]" />
                  <a href={contact.phoneHref} className="transition hover:text-navy-foreground">
                    {contact.phone}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.82_0.13_205)]" />
                  <a href={`mailto:${contact.email}`} className="transition hover:text-navy-foreground">
                    {contact.email}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.82_0.13_205)]" />
                  <span>{contact.address}</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div id="disclaimer" className="mt-12 rounded-2xl border border-navy-foreground/15 p-5">
          <h4 className="text-xs font-bold uppercase tracking-wide">Regulatory disclaimer</h4>
          <p className="mt-2 text-xs leading-relaxed text-navy-foreground/60">
            Growth Capital Services operates as a Direct Selling Agent (DSA) / authorised business associate
            and loan intermediary for partner banks and NBFCs. We are not a bank, NBFC or lender and do not
            lend money or accept deposits on our own account. All loan sanctions, interest rates, processing
            fees and terms are at the sole discretion of the respective lender and are subject to their credit
            policy, verification and documentation. Rates and figures shown on this website — including EMI
            and eligibility outputs — are indicative estimates for illustration only and do not constitute an
            offer or commitment of credit. We do not charge customers any fee for enquiries; never pay cash to
            any individual claiming to represent us.
          </p>
        </div>

        <p className="mt-8 text-xs text-navy-foreground/50">
          © {new Date().getFullYear()} Growth Capital Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
