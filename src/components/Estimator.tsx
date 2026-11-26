import { useState } from "react";
import { ALUMINIUM_PRODUCTS, FINISHES } from "../data";

type CalculatorType = "Aluminium systems" | "Roofing sheets";
type RoofingProduct = "Longspan" | "Steptiles" | "Metrocopo";
type Gauge = "0.40" | "0.45" | "0.50" | "0.55" | "0.60" | "0.70";
type Grade = "Market" | "Caliper";

const ROOFING_PRODUCTS: RoofingProduct[] = ["Longspan", "Steptiles", "Metrocopo"];
const GAUGES: Gauge[] = ["0.40", "0.45", "0.50", "0.55", "0.60", "0.70"];

const WHATSAPP_NUMBER = "2349016486105";
const DIMENSION_MIN_MM = 500;
const DIMENSION_MAX_MM = 15000;
const DIMENSION_STEP_MM = 100;
const MILLIMETRES_PER_METRE = 1000;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ?? (import.meta.env.DEV ? "http://127.0.0.1:8000" : "");
const QUOTE_API_URL = API_BASE_URL
  ? `${API_BASE_URL.replace(/\/+$/, "")}/api/quotes/`
  : "";

export default function Estimator() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>("Aluminium systems");

  const [product, setProduct] = useState(ALUMINIUM_PRODUCTS[0]);
  const [width, setWidth] = useState(1500);
  const [height, setHeight] = useState(1200);
  const [qty, setQty] = useState(4);
  const [finish, setFinish] = useState("Silver Anodized");
  const [install, setInstall] = useState(true);

  // Roofing estimator state.
  const [roofProduct, setRoofProduct] = useState<RoofingProduct>("Longspan");
  const [gauge, setGauge] = useState<Gauge>("0.40");
  const [grade, setGrade] = useState<Grade>("Market");
  const [roofArea, setRoofArea] = useState("100");
  const [colourCoated, setColourCoated] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [quoteError, setQuoteError] = useState("");

  const isRail = product.includes("per m");
  const aluminiumArea = isRail
    ? (width / MILLIMETRES_PER_METRE) * qty
    : (width / MILLIMETRES_PER_METRE) * (height / MILLIMETRES_PER_METRE) * qty;
  const roofAreaValue = Number(roofArea);
  const roofAreaValid = Number.isFinite(roofAreaValue) && roofAreaValue >= 1 && roofAreaValue <= 100000;

  const aluminiumQuoteMessage = [
    "Hello, I would like an aluminium quote.",
    `Product: ${product}`,
    ...(!isRail ? [`Dimensions per item: ${width} mm × ${height} mm`] : []),
    `${isRail ? "Length" : "Quantity"}: ${isRail ? `${width} mm` : qty}`,
    ...(!isRail ? [`Approximate total area: ${aluminiumArea.toFixed(2)} m²`] : []),
    `Finish: ${finish}`,
    `Installation requested: ${install ? "Yes" : "No"}`,
  ].join("\n");
  const aluminiumWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(aluminiumQuoteMessage)}`;

  const roofingQuoteMessage = [
    "Hello, I would like a roofing quote.",
    `Product: ${roofProduct}`,
    `Gauge: ${gauge} mm`,
    `Grade: ${grade}`,
    `Roof area: ${roofAreaValue.toLocaleString("en-NG")} m²`,
    `Colour-coated: ${colourCoated ? "Yes" : "No"}`,
  ].join("\n");
  const roofingWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(roofingQuoteMessage)}`;

  const sendQuoteToBackend = async () => {
    setQuoteStatus("sending");
    setQuoteError("");

    if (!QUOTE_API_URL) {
      setQuoteStatus("error");
      setQuoteError("Quote requests are not connected. Please contact us by WhatsApp.");
      return;
    }

    const contactDetails = {
      name: customerName.trim(),
      email: customerEmail.trim(),
      number: customerPhone.trim(),
    };
    const payload = calculatorType === "Aluminium systems"
      ? {
          ...contactDetails,
          estimator_type: "aluminium",
          product,
          width_mm: width,
          height_mm: isRail ? null : height,
          quantity: qty,
          finish,
          installation: install,
        }
      : {
          ...contactDetails,
          estimator_type: "roofing",
          product: roofProduct,
          gauge_mm: gauge,
          grade,
          area_m2: roofAreaValue,
          colour_coated: colourCoated,
        };

    try {
      const response = await fetch(QUOTE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || `Quote request failed (${response.status}).`);
      }

      setQuoteStatus("sent");
    } catch (error) {
      setQuoteStatus("error");
      setQuoteError(error instanceof Error ? error.message : "Unable to send the quote.");
    }
  };

  const quoteAction = (whatsappUrl: string, enabled: boolean) => (
    <form
      className="relative mt-8 space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        void sendQuoteToBackend();
      }}
    >
      <label className="block text-sm font-semibold">
        Your name
        <input required autoComplete="name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-slate-900/20 bg-white px-3" />
      </label>
      <label className="block text-sm font-semibold">
        Email address
        <input required type="email" autoComplete="email" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-slate-900/20 bg-white px-3" />
      </label>
      <label className="block text-sm font-semibold">
        Phone number
        <input required type="tel" autoComplete="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-slate-900/20 bg-white px-3" />
      </label>
      <button
        type="submit"
        disabled={!enabled || quoteStatus === "sending"}
        className="block min-h-14 w-full rounded-full bg-slate-950 py-4 text-center font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {quoteStatus === "sending" ? "Sending request..." : quoteStatus === "sent" ? "Request received" : "Request a quote"}
      </button>
      {quoteStatus === "sent" && (
        <p role="status" className="text-center text-xs text-slate-800">
          Your request was sent to our team. We’ll confirm pricing with you. You can also{" "}
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-bold underline">
            open WhatsApp
          </a>
          .
        </p>
      )}
      {quoteStatus === "error" && (
        <p role="alert" className="text-center text-xs text-red-900">
          {quoteError}{" "}
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-bold underline">
            Try WhatsApp instead
          </a>
          .
        </p>
      )}
    </form>
  );

  return (
    <section id="estimate" className="border-y border-(--line) bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-(--accent)">Request a quote</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-(--ink) md:text-5xl">Tell us about your project</h2>
          <p className="mt-4 text-lg text-(--muted)">Choose aluminium systems or roofing sheets and share your requirements. Our team will confirm the details and prepare your quote.</p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose estimator">
          {(["Aluminium systems", "Roofing sheets"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setCalculatorType(type)}
              aria-pressed={calculatorType === type}
              className={`min-h-12 rounded-full border px-5 py-3 text-sm font-semibold transition-colors ${
                calculatorType === type
                  ? "border-(--forest) bg-(--forest) text-white"
                  : "border-slate-700 bg-slate-700 text-white hover:bg-slate-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {calculatorType === "Aluminium systems" ? (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-7 rounded-3xl border border-white/5 bg-slate-900 p-5 sm:p-8 lg:col-span-3">
              <div>
                <label className="text-sm font-semibold text-slate-300">Product type</label>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ALUMINIUM_PRODUCTS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setProduct(item)}
                      aria-pressed={product === item}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                        product === item
                          ? "border-sky-400 bg-sky-400/10 text-white"
                          : "border-white/10 text-white hover:border-white/30"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`grid gap-6 ${isRail ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                <Slider
                  label={isRail ? "Length (mm)" : "Width (mm)"}
                  value={width}
                  min={DIMENSION_MIN_MM}
                  max={isRail ? 100000 : DIMENSION_MAX_MM}
                  step={DIMENSION_STEP_MM}
                  onChange={setWidth}
                />
                {!isRail && (
                  <Slider
                    label="Height (mm)"
                    value={height}
                    min={DIMENSION_MIN_MM}
                    max={DIMENSION_MAX_MM}
                    step={DIMENSION_STEP_MM}
                    onChange={setHeight}
                  />
                )}
                <Slider label="Quantity" value={qty} min={1} max={100} step={1} onChange={setQty} />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300">
                  Finish · <span className="text-sky-400">{finish}</span>
                </label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {Object.entries(FINISHES).map(([name, item]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setFinish(name)}
                      title={name}
                      aria-label={name}
                      aria-pressed={finish === name}
                      style={{ background: item.swatch }}
                      className={`h-11 w-11 rounded-full border-2 text-white transition-all ${
                        finish === name ? "scale-110 border-sky-400 ring-4 ring-sky-400/20" : "border-white/10 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer select-none items-center gap-3">
                <input type="checkbox" checked={install} onChange={(event) => setInstall(event.target.checked)} className="h-5 w-5 accent-sky-500" />
                <span className="text-slate-300">Include professional installation</span>
              </label>
            </div>

            <EstimateCard
              title="Request an exact quote"
              rows={[
                ["Product", product],
                ["Quantity", String(qty)],
                ...(!isRail ? [["Dimensions per item", `${width} mm × ${height} mm`] as [string, string]] : []),
                [isRail ? "Approximate total length" : "Approximate total area", `${aluminiumArea.toFixed(2)} ${isRail ? "m" : "m²"}`],
                ["Finish", finish],
                ["Installation requested", install ? "Yes" : "No"],
              ]}
              note="No price is calculated here. Our team will confirm the specification and prepare a quote."
              action={quoteAction(aluminiumWhatsappUrl, true)}
            />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-7 rounded-3xl border border-white/5 bg-slate-900 p-5 sm:p-8 lg:col-span-3">
              <fieldset>
                <legend className="text-sm font-semibold text-slate-300">Roofing product</legend>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {ROOFING_PRODUCTS.map((item) => (
                    <ChoiceButton key={item} selected={roofProduct === item} onClick={() => setRoofProduct(item)}>{item}</ChoiceButton>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-slate-300">Gauge / thickness</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {GAUGES.map((item) => {
                    return (
                      <ChoiceButton
                        key={item}
                        selected={gauge === item}
                        onClick={() => setGauge(item)}
                      >
                        {`${item} mm`}
                      </ChoiceButton>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-slate-300">Grade</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <ChoiceButton selected={grade === "Market"} onClick={() => setGrade("Market")}>Market</ChoiceButton>
                  <ChoiceButton selected={grade === "Caliper"} onClick={() => setGrade("Caliper")}>Caliper</ChoiceButton>
                </div>
              </fieldset>

              <label htmlFor="roof-area" className="block text-sm font-semibold text-slate-300">
                Roof area (m²)
                <input
                  id="roof-area"
                  type="number"
                  min="1"
                  max="100000"
                  step="0.1"
                  inputMode="decimal"
                  value={roofArea}
                  onChange={(event) => setRoofArea(event.target.value)}
                  className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-slate-950 px-4 text-white focus:border-sky-400 focus:outline-none"
                />
              </label>

              <div>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-slate-300">
                  <input type="checkbox" checked={colourCoated} onChange={(event) => setColourCoated(event.target.checked)} className="h-5 w-5 accent-sky-500" />
                  Colour-coated sheets
                </label>
                <p className="ml-8 text-xs leading-5 text-slate-400">
                  Included in the quote request; no additional charge is assumed because a coating rate was not provided.
                </p>
              </div>
            </div>

            <EstimateCard
              title="Request an exact quote"
              rows={[
                ["Product / grade", `${roofProduct} · ${grade}`],
                ["Gauge", `${gauge} mm`],
                ["Roof area", `${roofAreaValue.toLocaleString("en-NG")} m²`],
                ["Colour-coated", colourCoated ? "Yes" : "No"],
              ]}
              note="No price is calculated here. Our team will confirm the specification and prepare a quote."
              action={quoteAction(roofingWhatsappUrl, roofAreaValid)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function ChoiceButton({
  children,
  selected,
  disabled = false,
  onClick,
}: {
  children: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
      className={`min-h-12 rounded-xl border px-3 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${
        selected
          ? "border-sky-400 bg-sky-400/10 text-white"
          : "border-white/10 text-white hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}

function EstimateCard({
  title,
  rows,
  note,
  action,
}: {
  title: string;
  rows: [string, string][];
  note: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-6 text-slate-900 sm:p-8 lg:col-span-2">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 1px, transparent 1px 4px)" }} />
      <div className="relative flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.25em]">{title}</p>
        <dl className="mt-6 space-y-3 text-sm">
          {rows.map(([label, value]) => <Row key={label} k={label} v={value} />)}
        </dl>
        <p className="mt-6 border border-slate-900/20 p-4 text-sm leading-6">{note}</p>
      </div>
      {action ?? (
        <a href="#contact" className="relative mt-8 rounded-full bg-slate-950 py-4 text-center font-semibold text-white transition-colors hover:bg-slate-800">
          Book a free site visit
        </a>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-900/15 pb-2">
      <dt className="text-slate-700">{k}</dt>
      <dd className="text-right font-semibold">{v}</dd>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-slate-300">{label}</span>
        <span className="font-display font-bold text-white">{step < 1 ? value.toFixed(1) : value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 w-full accent-sky-500" />
    </div>
  );
}
