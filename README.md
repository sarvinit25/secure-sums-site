# Growth Capital Hub

# Role & Mission

You are an elite Senior UI/UX Designer and Lead Full-Stack Engineer specializing in high-conversion FinTech, loan aggregation, and DSA (Direct Selling Agent) web platforms.

Your goal is to build a modern, high-converting, responsive website for **Growth Capital Services** using the attached brand assets, service documentation, and design references.

---

### 1. Brand Identity & Design System

* **Brand Assets:** Extract the logo, primary color palette, and accent colors directly from the attached brand files.

* **Aesthetic:** Modern FinTech (inspired by Stripe, Cred, and modern neo-banking platforms). Clean typography, polished card shadows, subtle gradients, and rounded Bento-grid layouts. Avoid cluttered or outdated layouts.

* **Iconography:** Use modern vector icons (Lucide React).

* **Responsiveness:** 100% mobile-first design with smooth layout shifts on desktop viewports.

---

### 2. Core Structure & Sections Required

1. **Header / Navigation:**

   * High-resolution logo placement.

   * Product dropdown menu (Personal Loan, Business Loan, Home Loan, LAP, Working Capital, Credit Cards).

   * Direct CTAs: "Check Eligibility", "Track Application", and "Call Support".

2. **Hero Section:**

   * Bold, trust-building headline and value proposition.

   * Embedded **Quick Apply / Lead Ingestion Widget** (Loan Type, Desired Amount, Mobile Number, City).

   * Trust badges (e.g., "50+ Partner Banks & NBFCs", "Fast Approval", "Zero Hidden Charges").

3. **Interactive Financial Tools:**

   * **Dynamic EMI Calculator:** Interactive sliders for Loan Amount, Interest Rate, and Tenure with real-time monthly EMI, total interest payable, and amortization visualization.

   * **Instant Eligibility Checker:** Simple 3-step slider based on monthly income and employment status.

4. **Product Showcase (Bento Grid):**

   * Dedicated feature cards for each loan service based on the attached service documents.

   * Key details per card: Interest rate range, maximum tenure, required documents, and an "Apply Now" trigger.

5. **Why Choose Growth Capital Services:**

   * Key differentiators: Minimal documentation, multi-lender comparison, dedicated loan manager, fast disbursals.

6. **Partner Banks & NBFC Showcase:**

   * Clean scrolling logo marquee/grid showcasing major Indian financial institutions (HDFC, ICICI, SBI, Axis, Kotak, Bajaj Finserv, Tata Capital, etc.).

7. **How It Works (3-4 Step Roadmap):**

   * Step 1: Submit Application $\rightarrow$ Step 2: Document Verification $\rightarrow$ Step 3: Bank Sanction $\rightarrow$ Step 4: Disbursal.

8. **Interactive Multi-Step Lead Capture Modal:**

   * Step-by-step form capturing: Personal Details, PAN, Monthly Income/Business Turnover, Preferred Bank, and Document Upload placeholder.

   * Validation on every step with proper feedback states.

9. **Footer:**

   * Complete site map, regulatory disclaimers regarding DSA/intermediary status, customer care contact details, office address, and privacy policy links.

---

### 3. Technical Constraints & Best Practices

* **Framework:** Next.js (App Router) / React with Tailwind CSS.

* **Component Modularity:** Build clean, reusable components with modular file structures.

* **Interactivity:** Use state management for calculators, multi-step forms, and tabs with smooth micro-animations.

* **Data Handling:** Use mock JSON datasets for interest rates, bank lists, and product parameters to make them easily configurable.

---

### 4. Input References

* Refer to the attached files for exact typography, color hex codes, product details, and layout inspiration from the reference links.

* Prioritize clean visual hierarchy, legible financial metrics, and high-converting CTA placements throughout.

Create a modern, professional website layout. For the navigation tabs and call-to-action buttons, implement a smooth reveal-on-scroll animation. Use the Intersection Observer API so that as the user scrolls down, the elements use a staggered fade-in up effect with a slight scale-in. Ensure the transition is fluid, taking about 0.6 seconds per element

the following are the sample websites for the same

https://www.apnarupee.com/

https://rupeeatm.com/

https://www.loansuvida.com/

https://rupeedial.com/

https://sample.dsamanagement.tech/ https://www.instagram.com/growth_capital_services/-- this is the logo

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://secure-sums-site.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d554aa8e-f075-4bac-aaae-16cffbcb433d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
