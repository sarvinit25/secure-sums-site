import { createFileRoute } from "@tanstack/react-router";
import { LeadProvider } from "@/components/lead-modal";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Calculators } from "@/components/calculators";
import { ProductsGrid } from "@/components/products-grid";
import { WhyUs } from "@/components/why-us";
import { PartnersMarquee } from "@/components/partners-marquee";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";

const title = "Growth Capital Services | Home, Business & Personal Loans in Mumbai";
const description =
  "Compare loan offers from 50+ banks and NBFCs. Home loans, LAP, business, personal, working capital and car loans with EMI calculator, eligibility check and doorstep documentation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LeadProvider>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main>
          <Hero />
          <ProductsGrid />
          <Calculators />
          <WhyUs />
          <PartnersMarquee />
          <HowItWorks />
        </main>
        <SiteFooter />
      </div>
    </LeadProvider>
  );
}
