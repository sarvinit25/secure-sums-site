import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { X, Check, ArrowRight, ArrowLeft, UploadCloud, PartyPopper } from "lucide-react";
import { cities, partners, products } from "@/data/site";

type LeadContextValue = {
  open: (productSlug?: string) => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside <LeadProvider>");
  return ctx;
}

type FormState = {
  product: string;
  fullName: string;
  mobile: string;
  city: string;
  pan: string;
  income: string;
  employment: string;
  bank: string;
  fileName: string;
};

const emptyForm: FormState = {
  product: products[0]!.slug,
  fullName: "",
  mobile: "",
  city: cities[0]!,
  pan: "",
  income: "",
  employment: "Salaried",
  bank: "No preference",
  fileName: "",
};

const steps = ["Personal details", "Income & PAN", "Preferences & documents"];

function validateStep(step: number, form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (step === 0) {
    if (form.fullName.trim().length < 3) errors["fullName"] = "Enter your full name (min 3 characters).";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim()))
      errors["mobile"] = "Enter a valid 10-digit Indian mobile number.";
    if (!form.city) errors["city"] = "Select your city.";
  }
  if (step === 1) {
    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(form.pan.trim().toUpperCase()))
      errors["pan"] = "PAN must look like ABCDE1234F.";
    const income = Number(form.income);
    if (!form.income || Number.isNaN(income) || income < 10000)
      errors["income"] = "Enter monthly income / turnover of at least ₹10,000.";
  }
  return errors;
}

export function LeadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback((productSlug?: string) => {
    setForm({ ...emptyForm, product: productSlug ?? emptyForm.product });
    setErrors({});
    setStep(0);
    setSubmitted(false);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  const set = (key: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [key]: v }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const next = () => {
    const found = validateStep(step, form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < steps.length - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const field =
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

  return (
    <LeadContext.Provider value={value}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-card p-6 shadow-[var(--shadow-float)] sm:rounded-3xl sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-bold text-foreground">Apply in 3 quick steps</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  A dedicated loan manager calls you within 24 working hours.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close application form"
                className="shrink-0 rounded-full border border-border p-2 text-muted-foreground transition hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="mt-8 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-brand-bg text-primary-foreground">
                  <PartyPopper className="h-7 w-7" />
                </div>
                <h4 className="mt-4 text-lg font-bold text-foreground">Application received</h4>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  Thanks {form.fullName.split(" ")[0]}! Reference GCS-
                  {String(Math.floor(Math.random() * 900000) + 100000)}. Our team will match you with the best
                  offers from our lender network.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 w-full rounded-xl gradient-brand-bg px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <ol className="mt-6 flex items-center gap-2">
                  {steps.map((label, i) => (
                    <li key={label} className="flex flex-1 items-center gap-2">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold transition ${
                          i < step
                            ? "bg-brand text-brand-foreground"
                            : i === step
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </span>
                      <span className="hidden truncate text-xs font-medium text-muted-foreground sm:block">
                        {label}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 space-y-4">
                  {step === 0 && (
                    <>
                      <div>
                        <label className="text-xs font-semibold text-foreground">Loan type</label>
                        <select
                          className={`${field} mt-1.5`}
                          value={form.product}
                          onChange={(e) => set("product", e.target.value)}
                        >
                          {products.map((p) => (
                            <option key={p.slug} value={p.slug}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground">Full name</label>
                        <input
                          className={`${field} mt-1.5`}
                          maxLength={100}
                          value={form.fullName}
                          onChange={(e) => set("fullName", e.target.value)}
                          placeholder="As printed on your PAN"
                        />
                        {errors["fullName"] && (
                          <p className="mt-1 text-xs text-destructive">{errors["fullName"]}</p>
                        )}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-semibold text-foreground">Mobile number</label>
                          <input
                            className={`${field} mt-1.5`}
                            inputMode="numeric"
                            maxLength={10}
                            value={form.mobile}
                            onChange={(e) => set("mobile", e.target.value.replace(/\D/g, ""))}
                            placeholder="10-digit mobile"
                          />
                          {errors["mobile"] && (
                            <p className="mt-1 text-xs text-destructive">{errors["mobile"]}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-foreground">City</label>
                          <select
                            className={`${field} mt-1.5`}
                            value={form.city}
                            onChange={(e) => set("city", e.target.value)}
                          >
                            {cities.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <div>
                        <label className="text-xs font-semibold text-foreground">PAN number</label>
                        <input
                          className={`${field} mt-1.5 uppercase`}
                          maxLength={10}
                          value={form.pan}
                          onChange={(e) => set("pan", e.target.value.toUpperCase())}
                          placeholder="ABCDE1234F"
                        />
                        {errors["pan"] && <p className="mt-1 text-xs text-destructive">{errors["pan"]}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground">Employment type</label>
                        <div className="mt-1.5 grid grid-cols-3 gap-2">
                          {["Salaried", "Self-employed", "Business"].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => set("employment", t)}
                              className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${
                                form.employment === t
                                  ? "border-brand bg-accent text-accent-foreground"
                                  : "border-border text-muted-foreground hover:bg-secondary"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-foreground">
                          Monthly income / business turnover (₹)
                        </label>
                        <input
                          className={`${field} mt-1.5`}
                          inputMode="numeric"
                          maxLength={12}
                          value={form.income}
                          onChange={(e) => set("income", e.target.value.replace(/\D/g, ""))}
                          placeholder="e.g. 85000"
                        />
                        {errors["income"] && (
                          <p className="mt-1 text-xs text-destructive">{errors["income"]}</p>
                        )}
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div>
                        <label className="text-xs font-semibold text-foreground">Preferred lender</label>
                        <select
                          className={`${field} mt-1.5`}
                          value={form.bank}
                          onChange={(e) => set("bank", e.target.value)}
                        >
                          <option>No preference</option>
                          {partners.map((b) => (
                            <option key={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-secondary/50 px-4 py-8 text-center transition hover:border-brand">
                        <UploadCloud className="h-6 w-6 text-brand" />
                        <span className="text-sm font-semibold text-foreground">
                          {form.fileName || "Upload KYC / income documents"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          PDF, JPG or PNG — optional, you can share later on WhatsApp
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => set("fileName", e.target.files?.[0]?.name ?? "")}
                        />
                      </label>
                      <p className="text-xs text-muted-foreground">
                        By submitting you authorise Growth Capital Services and its partner banks/NBFCs to
                        contact you regarding your enquiry.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-7 flex items-center gap-3">
                  {step > 0 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                  )}
                  <button
                    onClick={next}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl gradient-brand-bg px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95"
                  >
                    {step === steps.length - 1 ? "Submit application" : "Continue"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </LeadContext.Provider>
  );
}
