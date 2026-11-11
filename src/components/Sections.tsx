import { useState } from "react";
import { IMAGES, PROCESS, PRODUCTS, SERVICES, type Category } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n";

const CATEGORIES: Category[] = ["All", "Windows", "Doors", "Facades", "Railings"];

export function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">{t("Made for your project")}</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">{t("The right frame changes everything.")}</h2>
          <p className="mt-5 max-w-md leading-7 text-(--muted)">{t("From a single opening to a considered building exterior, explore aluminium systems for the spaces you use every day.")}</p>
          <a href="#contact" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-(--ink) underline decoration-(--accent) underline-offset-4">{t("Discuss a project")} <Icon name="arrow" className="h-4 w-4 text-(--accent)" /></a>
        </div>
        <div className="border-t border-(--line)">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title}>
              <a href="#contact" className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-(--line) py-5 transition-colors hover:bg-[#eeede7] sm:grid-cols-[3rem_1fr_auto] sm:gap-6 sm:py-6">
                <span className="font-display text-xs text-(--accent)">0{index + 1}</span>
                <span>
                  <span className="block font-display text-lg font-semibold tracking-tight sm:text-xl">{t(service.title)}</span>
                  <span className="mt-1 block max-w-lg text-sm leading-6 text-(--muted)">{t(service.text)}</span>
                </span>
                <Icon name="arrow" className="h-5 w-5 text-(--muted) transition-transform group-hover:translate-x-1 group-hover:text-(--accent)" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products() {
  const [category, setCategory] = useState<Category>("All");
  const { t } = useLanguage();
  const products = category === "All" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category);

  return (
    <section id="products" className="border-y border-(--line) bg-[#eaeae4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">{t("The collection")}</p>
            <h2 className="max-w-xl font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">{t("Systems that let the light in.")}</h2>
            <p className="mt-4 max-w-lg leading-7 text-(--muted)">{t("Explore the possibilities. We'll help you find the right configuration for your opening, finish and project.")}</p>
          </div>
          <a href="#contact" className="inline-flex min-h-11 items-center gap-3 self-start text-sm font-semibold underline decoration-(--accent) underline-offset-4 md:self-auto">{t("Ask about a product")} <Icon name="arrow" className="h-4 w-4 text-(--accent)" /></a>
        </div>

        <div className="my-8 flex max-w-full gap-1 overflow-x-auto border-b border-(--line)" role="group" aria-label="Filter products by category">
          {CATEGORIES.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`min-h-12 shrink-0 rounded-full border px-4 text-sm text-white transition-colors ${category === item ? "border-(--forest) bg-(--forest) font-semibold" : "border-slate-700 bg-slate-700 hover:bg-slate-800"}`}>
              {t(item)}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article key={product.name} className={`${index === 0 && products.length > 2 ? "sm:row-span-2" : ""} group flex flex-col`}>
              <a href="#contact" aria-label={`${t("Ask about a product")}: ${t(product.name)}`} className={`relative block min-h-64 flex-1 overflow-hidden bg-[#d8dcd5] ${index === 0 && products.length > 2 ? "sm:min-h-136" : "sm:min-h-64"}`}>
                <img src={product.img} alt={`${product.category} aluminium system in a contemporary interior`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute left-4 top-4 bg-(--paper) px-3 py-1.5 text-xs font-semibold text-(--ink)">{t(product.category)}</span>
                <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center bg-(--paper) text-(--ink) transition-colors group-hover:bg-(--accent) group-hover:text-white"><Icon name="arrow" className="h-4 w-4" /></span>
              </a>
              <div className="flex items-start justify-between gap-4 border-b border-(--line) py-4">
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{t(product.name)}</h3>
                  <p className="mt-1 text-sm text-(--muted)">{product.specs.slice(0, 2).map(t).join(" · ")}</p>
                </div>
                <a href="#contact" className="shrink-0 pt-1 text-xs font-semibold text-(--accent)">{t("Enquire")}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  const { t } = useLanguage();
  return (
    <section id="approach" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-20 lg:px-12 lg:py-28">
      <div className="relative min-h-[340px] sm:min-h-[480px]">
        <img src={IMAGES.weld1} alt="Aluminium fabrication work in a workshop" loading="lazy" className="absolute inset-0 h-full w-[78%] object-cover" />
        <img src={IMAGES.weld2} alt="Close view of metal fabrication" loading="lazy" className="absolute bottom-0 right-0 h-[52%] w-[44%] border-10 border-(--paper) object-cover sm:border-14" />
      </div>
      <div>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">{t("Made with intention")}</p>
        <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">{t("A better fit starts with listening.")}</h2>
        <p className="mt-6 leading-7 text-(--muted)">{t("Every project has its own proportions, priorities and point of view. We work with you to shape an aluminium solution that belongs in the space, down to the finish and the final fit.")}</p>
        <a href="#contact" style={{ color: "#fff" }} className="mt-8 inline-flex min-h-12 items-center gap-3 bg-(--forest) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#29392f]">{t("Start a conversation")} <Icon name="arrow" className="h-4 w-4" /></a>
      </div>
    </section>
  );
}

export function Process() {
  const { t } = useLanguage();
  return (
    <section className="bg-(--forest) py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#e1a18e]">{t("From first sketch to final fit")}</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">{t("A clear process. A considered result.")}</h2>
        </div>
        <div className="mt-12 grid gap-8 border-t border-white/20 pt-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {PROCESS.map((step) => (
            <div key={step.step}>
              <p className="font-display text-sm text-[#e1a18e]">{step.step}</p>
              <h3 className="mt-5 font-display text-xl font-semibold">{t(step.title)}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">{t(step.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}