import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import logo from "@/assets/gcs-logo.png.asset.json";
import { contact, products } from "@/data/site";
import { useLead } from "@/components/lead-modal";
import { Reveal } from "@/lib/reveal";

const navProducts = products.slice(0, 6);

export function SiteHeader() {
  const { open } = useLead();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-background"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="Growth Capital Services logo"
            className="h-11 w-11 shrink-0 rounded-xl object-contain sm:h-12 sm:w-12"
            width={48}
            height={48}
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-extrabold tracking-tight text-foreground sm:text-base">
              Growth Capital Services
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Your Dreams, Our Funding Expertise
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary">
                Products <ChevronDown className="h-4 w-4" />
              </button>
              {dropdown && (
                <div className="absolute left-0 top-full w-72 pt-2">
                  <div className="surface-card overflow-hidden p-2">
                    {navProducts.map((p, i) => (
                      <Reveal key={p.slug} delay={i * 40}>
                        <a
                          href="#products"
                          className="block rounded-xl px-3 py-2.5 transition hover:bg-secondary"
                        >
                          <span className="block text-sm font-semibold text-foreground">{p.name}</span>
                          <span className="block text-xs text-muted-foreground">{p.tagline}</span>
                        </a>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {[
              ["Calculators", "#calculators"],
              ["Lenders", "#lenders"],
              ["Process", "#process"],
            ].map(([label, href], i) => (
              <Reveal key={label} delay={i * 80}>
                <a
                  href={href}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
                >
                  {label}
                </a>
              </Reveal>
            ))}
          </nav>

          <Reveal delay={120} className="hidden md:block">
            <a
              href="#eligibility"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <Search className="h-4 w-4" /> Check Eligibility
            </a>
          </Reveal>
          <Reveal delay={200} className="hidden xl:block">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <Phone className="h-4 w-4" /> Call Support
            </a>
          </Reveal>
          <Reveal delay={280}>
            <button
              onClick={() => open()}
              className="hidden rounded-full gradient-brand-bg px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition hover:opacity-95 sm:inline-flex"
            >
              Track / Apply
            </button>
          </Reveal>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-xl border border-border p-2 text-foreground lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <p className="px-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">Products</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {navProducts.map((p) => (
              <a
                key={p.slug}
                href="#products"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-secondary px-3 py-2.5 text-sm font-semibold text-foreground"
              >
                {p.name}
              </a>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <a
              href="#eligibility"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border border-border px-3 py-2.5 text-center text-sm font-semibold text-foreground"
            >
              Check Eligibility
            </a>
            <a
              href={contact.phoneHref}
              className="rounded-xl border border-border px-3 py-2.5 text-center text-sm font-semibold text-foreground"
            >
              Call Support
            </a>
            <button
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              className="rounded-xl gradient-brand-bg px-3 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Track / Apply
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
