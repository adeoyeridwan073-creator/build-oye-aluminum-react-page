import { useMemo, useState } from "react";
import { FINISHES, PRODUCT_RATES } from "../data";

type CalculatorType = "Aluminium systems" | "Roofing sheets";
type RoofingProduct = "Longspan" | "Steptiles" | "Metrocopo";
type Gauge = "0.40" | "0.45" | "0.50" | "0.55" | "0.60" | "0.70";
type Grade = "Market" | "Caliper";

const ROOFING_PRODUCTS: RoofingProduct[] = ["Longspan", "Steptiles", "Metrocopo"];
const GAUGES: Gauge[] = ["0.40", "0.45", "0.50", "0.55", "0.60", "0.70"];

// Update these sample Lagos market rates when you receive current supplier prices.
// The supplied rates are reused for all roofing products as temporary estimates.
const ROOFING_MARKET_RATES: Partial<Record<Gauge, number>> = {
  "0.40": 5600,
  "0.45": 6200,
  "0.50": 6800,
  "0.55": 8100,
  // Add verified rates for "0.60" and "0.70" to enable those gauges.
};

const CALIPER_MULTIPLIER = 1.7;
const ROOFING_WASTAGE_RATE = 0.12;
const LABOUR_OVERHEAD_RATE = 0.25;
const PROFIT_RATE = 0.25;
const WHATSAPP_NUMBER = "23480655882336"; // Add country code without + or spaces to enable direct WhatsApp requests.
const DIMENSION_MIN_MM = 500;
const DIMENSION_MAX_MM = 15000;
const DIMENSION_STEP_MM = 100;
const MILLIMETRES_PER_METRE = 1000;
const ALUMINIUM_WASTAGE_RATE = 0.1;
const QUOTE_API_URL = `${(import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "")}/api/quotes/`;

const formatNaira = (amount: number) =>
  amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });

export default function Estimator() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>("Aluminium systems");

  // Aluminium rates are indicative Nigeria market budgets in NGN.
  const [product, setProduct] = useState(Object.keys(PRODUCT_RATES)[0]);
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
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [quoteError, setQuoteError] = useState("");

  const isRail = product.includes("per m");
  const isSlidingWindow = product === "Sliding Window";
  const stockLength = 6;
  const cuttingAllowance = 0.05;
  const aluminiumEstimate = useMemo(() => {
    const widthInMetres = width / MILLIMETRES_PER_METRE;
    const heightInMetres = height / MILLIMETRES_PER_METRE;
    const area = isRail ? widthInMetres * qty : widthInMetres * heightInMetres * qty;
    const baseMaterial = area * PRODUCT_RATES[product] * FINISHES[finish].mult;
    const wastage = baseMaterial * ALUMINIUM_WASTAGE_RATE;
    const material = baseMaterial + wastage;
    const installation = install ? material * 0.15 : 0;
    const total = material + installation;

    const perimeter = isSlidingWindow ? 2 * (widthInMetres + heightInMetres) : 0;
    const profileLengthPerWindow = perimeter * (1 + cuttingAllowance);
    const stockLengths = isSlidingWindow
      ? Math.ceil(profileLengthPerWindow / stockLength) * qty
      : 0;

    return { area, total, baseMaterial, wastage, material, installation, perimeter, profileLengthPerWindow, stockLengths };
  }, [product, width, height, qty, finish, install, isRail, isSlidingWindow]);

  const roofAreaValue = Number(roofArea);
  const roofBaseRate = ROOFING_MARKET_RATES[gauge];
  const roofUnitRate = roofBaseRate === undefined
    ? undefined
    : grade === "Caliper"
      ? roofBaseRate * CALIPER_MULTIPLIER
      : roofBaseRate;

  const roofingEstimate = useMemo(() => {
    if (!roofUnitRate || !Number.isFinite(roofAreaValue) || roofAreaValue <= 0) return null;

    const baseMaterial = roofAreaValue * roofUnitRate;
    const wastage = baseMaterial * ROOFING_WASTAGE_RATE;
    const material = baseMaterial + wastage;
    const labourOverhead = material * LABOUR_OVERHEAD_RATE;
    const profit = (material + labourOverhead) * PROFIT_RATE;

    return {
      unitRate: roofUnitRate,
      baseMaterial,
      wastage,
      material,
      labourOverhead,
      profit,
      total: material + labourOverhead + profit,
    };
  }, [roofAreaValue, roofUnitRate]);

  const aluminiumQuoteMessage = [
    "Hello, I would like an exact aluminium quote.",
    `Product: ${product}`,
    ...(!isRail ? [`Dimensions per item: ${width} mm × ${height} mm`] : []),
    `${isRail ? "Total length" : "Quantity"}: ${isRail ? `${aluminiumEstimate.area.toFixed(2)} m` : qty}`,
    ...(!isRail ? [`Total area: ${aluminiumEstimate.area.toFixed(2)} m²`] : []),
    `Finish: ${finish}`,
    `Installation: ${install ? "Included" : "Supply only"}`,
    `Estimated total: ${formatNaira(aluminiumEstimate.total)}`,
  ].join("\n");
  const aluminiumWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(aluminiumQuoteMessage)}`;

  const roofingQuoteMessage = [
    "Hello, I would like an exact roofing quote.",
    `Product: ${roofProduct}`,
    `Gauge: ${gauge} mm`,
    `Grade: ${grade}`,
    `Roof area: ${roofAreaValue.toLocaleString("en-NG")} m²`,
    `Colour-coated: ${colourCoated ? "Yes" : "No"}`,
    roofingEstimate ? `Estimated total: ${formatNaira(roofingEstimate.total)}` : "Please confirm pricing.",
  ].join("\n");
  const roofingWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(roofingQuoteMessage)}`;

  const sendQuoteToBackend = async () => {
    setQuoteStatus("sending");
    setQuoteError("");

    const payload = calculatorType === "Aluminium systems"
      ? {
          estimator_type: "aluminium",
          product,
          width_mm: width,
          height_mm: isRail ? null : height,
          quantity: qty,
          finish,
          installation: install,
          area_m2: Number(aluminiumEstimate.area.toFixed(2)),
          estimated_total_ngn: Math.round(aluminiumEstimate.total),
          quote_message: aluminiumQuoteMessage,
        }
      : {
          estimator_type: "roofing",
          product: roofProduct,
          gauge_mm: Number(gauge),
          grade,
          area_m2: roofAreaValue,
          colour_coated: colourCoated,
          estimated_total_ngn: roofingEstimate ? Math.round(roofingEstimate.total) : null,
          quote_message: roofingQuoteMessage,
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
    <div className="relative mt-8 space-y-3">
      <button
        type="button"
        onClick={sendQuoteToBackend}
        disabled={!enabled || quoteStatus === "sending"}
        className="block min-h-14 w-full rounded-full bg-slate-950 py-4 text-center font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {quoteStatus === "sending" ? "Sending quote..." : quoteStatus === "sent" ? "Quote sent successfully" : "Send quote request"}
      </button>
      {quoteStatus === "sent" && (
        <p role="status" className="text-center text-xs text-slate-800">
          Your quote was sent to our team. You can also{" "}
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
    </div>
  );

  return (
    <section id="estimate" className="border-y border-(--line) bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-(--accent)">Instant estimate</p>
          <h2 className="font-display text-3xl font-bold leading-tight text-(--ink) md:text-5xl">Price your project in seconds</h2>
          <p className="mt-4 text-lg text-(--muted)">Choose an estimator for aluminium systems or roofing sheets. Both provide an indicative Nigeria market estimate.</p>
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
                  {Object.keys(PRODUCT_RATES).map((item) => (
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
                      className={`h-11 w-11 rounded-full border-2 transition-all ${
                        finish === name ? "scale-110 border-sky-400 ring-4 ring-sky-400/20" : "border-white/10 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer select-none items-center gap-3">
                <input type="checkbox" checked={install} onChange={(event) => setInstall(event.target.checked)} className="h-5 w-5 accent-sky-500" />
                <span className="text-slate-300">Include professional installation (+15%)</span>
              </label>
            </div>

            <EstimateCard
              title="Estimated total"
              total={formatNaira(aluminiumEstimate.total)}
              rows={[
                ["Product", product],
                ["Quantity", String(qty)],
                ...(!isRail ? [["Dimensions per item", `${width} mm × ${height} mm`] as [string, string]] : []),
                [isRail ? "Total length" : "Total area", `${aluminiumEstimate.area.toFixed(2)} ${isRail ? "m" : "m²"}`],
                ["Material + finish", formatNaira(aluminiumEstimate.baseMaterial)],
                ["Wastage allowance (10%)", formatNaira(aluminiumEstimate.wastage)],
                ["Material incl. wastage", formatNaira(aluminiumEstimate.material)],
                ["Installation (15%)", install ? formatNaira(aluminiumEstimate.installation) : "Excluded"],
                ...(isSlidingWindow
                  ? [
                      ["Frame perimeter per window", `${aluminiumEstimate.perimeter.toFixed(2)} m`] as [string, string],
                      ["Profile incl. 5% cutting allowance", `${aluminiumEstimate.profileLengthPerWindow.toFixed(2)} m / window`] as [string, string],
                      ["6 m stock lengths required", String(aluminiumEstimate.stockLengths)] as [string, string],
                    ]
                  : []),
                ["Finish", finish],
                ["Installation", install ? "Included" : "Supply only"],
              ]}
              note={isSlidingWindow ? "Profile length uses the outer frame perimeter plus 5% cutting allowance. Final cut planning may change material usage." : "Indicative Nigeria budget rate in NGN. Confirm profile, glass, hardware, transport, VAT and site conditions before quoting."}
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
                    const available = ROOFING_MARKET_RATES[item] !== undefined;
                    return (
                      <ChoiceButton
                        key={item}
                        selected={gauge === item}
                        disabled={!available}
                        onClick={() => setGauge(item)}
                      >
                        {`${item} mm${available ? "" : " · rate needed"}`}
                      </ChoiceButton>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold text-slate-300">Grade</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <ChoiceButton selected={grade === "Market"} onClick={() => setGrade("Market")}>Market</ChoiceButton>
                  <ChoiceButton selected={grade === "Caliper"} onClick={() => setGrade("Caliper")}>Caliper (+70% estimate)</ChoiceButton>
                </div>
              </fieldset>

              <label htmlFor="roof-area" className="block text-sm font-semibold text-slate-300">
                Roof area (m²)
                <input
                  id="roof-area"
                  type="number"
                  min="1"
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
              title="Roofing estimate"
              total={roofingEstimate ? formatNaira(roofingEstimate.total) : undefined}
              rows={roofingEstimate ? [
                ["Product / grade", `${roofProduct} · ${grade}`],
                ["Gauge", `${gauge} mm`],
                ["Roof area", `${roofAreaValue.toLocaleString("en-NG")} m²`],
                ["Rate per m²", formatNaira(roofingEstimate.unitRate)],
                ["Base material", formatNaira(roofingEstimate.baseMaterial)],
                ["Wastage (12%)", formatNaira(roofingEstimate.wastage)],
                ["Material incl. wastage", formatNaira(roofingEstimate.material)],
                ["Labour + overhead (25%)", formatNaira(roofingEstimate.labourOverhead)],
                ["Profit (25%)", formatNaira(roofingEstimate.profit)],
              ] : []}
              note={roofingEstimate
                ? "Indicative Nigeria market rates. Supplier prices, product, site conditions and final measurements may change the quote."
                : roofUnitRate === undefined
                  ? `A verified Market rate for ${gauge} mm has not been added. Add it to ROOFING_MARKET_RATES to enable this gauge.`
                  : "Enter a roof area greater than zero to calculate an estimate."}
              action={roofingEstimate
                ? quoteAction(roofingWhatsappUrl, true)
                : <a href="#contact" className="relative mt-8 block rounded-full bg-slate-950 py-4 text-center font-semibold text-white transition-colors hover:bg-slate-800">Request Exact Quote</a>}
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
  total,
  rows,
  note,
  action,
}: {
  title: string;
  total?: string;
  rows: [string, string][];
  note: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-6 text-slate-900 sm:p-8 lg:col-span-2">
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 1px, transparent 1px 4px)" }} />
      <div className="relative flex-1">
        <p className="text-xs font-bold uppercase tracking-[0.25em]">{title}</p>
        {total ? (
          <>
            <p className="mt-3 break-words font-display text-4xl font-bold sm:text-5xl">{total}</p>
            <dl className="mt-8 space-y-3 text-sm">
              {rows.map(([label, value]) => <Row key={label} k={label} v={value} />)}
            </dl>
          </>
        ) : (
          <p role="status" className="mt-6 border border-slate-900/20 p-4 text-sm leading-6">
            {note}
          </p>
        )}
      </div>
      {action ?? (
        <a href="#contact" className="relative mt-8 rounded-full bg-slate-950 py-4 text-center font-semibold text-white transition-colors hover:bg-slate-800">
          Book a free site visit
        </a>
      )}
      {total && <p className="relative mt-3 text-center text-xs text-slate-800">{note}</p>}
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
