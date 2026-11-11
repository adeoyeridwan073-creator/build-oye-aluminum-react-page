import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data";
import Icon from "./Icon";
import { LANGUAGES, useLanguage, type Language } from "../i18n";

export function Logo() {
  return (
    <a href="#home" aria-label="Oye Ademola Commercial Ent. home" className="group relative flex shrink-0 items-center py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:bg-(--accent) after:transition-all hover:after:w-14 focus-visible:after:w-14">
      <img src="/oye-logo.svg" alt="Oye Ademola Commercial Ent." className="h-auto w-[148px] transition-opacity duration-200 group-hover:opacity-85 sm:w-[180px] lg:w-[200px]" />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-(--line) bg-(--paper) py-3" : "bg-(--paper)/95 py-4 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative text-sm font-medium text-(--muted) transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-(--accent) after:transition-all hover:text-(--ink) hover:after:w-full">
                {t(l.label)}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSelect value={language} onChange={setLanguage} />
          <a href="#contact" className="inline-flex items-center gap-2 bg-(--accent) px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#963d2a]">
            {t("Get a Quote")} <Icon name="arrow" className="w-4 h-4" />
          </a>
        </div>
        <button className="min-h-11 min-w-11 text-(--ink) lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation">
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>
      {open && (
        <ul id="mobile-navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-6 pt-4 lg:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-(--line) py-3 text-(--ink)">
                {t(l.label)}
              </a>
            </li>
          ))}
          <div className="mt-4 flex items-center justify-between gap-4">
            <LanguageSelect value={language} onChange={setLanguage} />
            <a href="#contact" onClick={() => setOpen(false)} className="bg-(--accent) px-5 py-3 text-center text-sm font-semibold text-white">
            {t("Get a Quote")}
          </a>
          </div>
        </ul>
      )}
    </header>
  );
}

function LanguageSelect({ value, onChange }: { value: Language; onChange: (language: Language) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm text-(--muted)">
      <span className="sr-only">Choose language</span>
      <select value={value} onChange={(event) => onChange(event.target.value as Language)} aria-label="Choose language" className="min-h-11 cursor-pointer border border-(--line) bg-transparent px-3 text-sm font-semibold text-(--ink) focus:border-(--accent) focus:outline-none">
        {LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.native}</option>)}
      </select>
    </label>
  );
}
