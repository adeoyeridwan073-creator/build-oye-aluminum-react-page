import { IMAGES } from "../data";
import Icon from "./Icon";
import { useLanguage } from "../i18n";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section id="home" className="pt-24 lg:pt-28">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-14 lg:px-12 lg:pb-20">
        <div className="max-w-xl py-10 lg:py-16">
          <p className="animate-fade-up mb-6 text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">{t("Aluminium, considered")}</p>
          <h1 className="animate-fade-up font-display text-[clamp(3.4rem,7vw,6.5rem)] font-medium leading-[0.91] tracking-[-0.055em] text-(--ink)" style={{ animationDelay: "0.08s" }}>
            {t("A clearer view")}<br />{t("of what's possible.")}
          </h1>
          <p className="animate-fade-up mt-7 max-w-md text-base leading-7 text-(--muted) sm:text-lg" style={{ animationDelay: "0.16s" }}>
            {t("Made-to-measure aluminium windows, doors and architectural systems, shaped around the way you live and build.")}
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ animationDelay: "0.24s" }}>
            <a href="#contact" className="inline-flex min-h-12 items-center gap-3 bg-(--accent) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#963d2a]">
              {t("Talk about your project")} <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a href="#products" className="inline-flex min-h-12 items-center text-sm font-semibold text-(--ink) underline decoration-(--line) underline-offset-4 transition-colors hover:decoration-(--accent)">
              {t("Explore the range")}
            </a>
          </div>
          <p className="mt-12 border-l border-(--accent) pl-4 text-sm leading-6 text-(--muted)">
            {t("Thoughtful details. Clean lines.")}<br />{t("A fit that feels like it was always there.")}
          </p>
        </div>
        <div className="animate-fade-up animate-float relative min-h-[390px] overflow-hidden bg-[#d9ded8] sm:min-h-[520px] lg:min-h-[640px]" style={{ animationDelay: "0.18s" }}>
          <img src={IMAGES.hero} alt="Contemporary aluminium-framed glazing" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 text-xs font-medium uppercase tracking-[0.16em] text-white sm:bottom-7 sm:left-7">{t("Form meets the everyday")}</p>
          <span aria-hidden="true" className="absolute right-5 top-5 h-9 w-9 border-r border-t border-white/80 sm:right-7 sm:top-7" />
        </div>
      </div>
    </section>
  );
}
