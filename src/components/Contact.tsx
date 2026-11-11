import { useState, type FormEvent } from "react";
import { NAV_LINKS, SERVICES } from "../data";
import Icon from "./Icon";
import { Logo } from "./Navbar";
import { useLanguage } from "../i18n";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const { t } = useLanguage();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setIsSubmitting(true);
    setSubmissionStatus("");

    try {
      const response = await fetch(
        `${(import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "")}/api/messages/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            number: data.get("phone"),
            service: data.get("service"),
            message: data.get("message"),
          }),
        },
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We could not send your message. Please try again.");
      }

      form.reset();
      setSubmissionStatus(t("Your message has been sent. We'll be in touch soon."));
    } catch (error) {
      setSubmissionStatus(
        error instanceof Error
          ? error.message
          : t("We could not send your message. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const input = "w-full border border-(--line) bg-(--paper) px-4 py-3.5 text-(--ink) placeholder:text-[#858b85] transition focus:border-(--accent) focus:outline-none";

  return (
    <section id="contact" className="border-t border-(--line) bg-[#eaeae4] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-(--accent)">{t("Your project, next")}</p>
          <h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">{t("Let's find the right fit.")}</h2>
          <p className="mt-5 max-w-md leading-7 text-(--muted)">{t("Share a few details about what you're planning. We'll send your project information to our team.")}</p>
          <a className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-(--ink) underline decoration-(--accent) underline-offset-4" href="mailto:hello@oyealuminum.com">hello@oyealuminum.com <Icon name="arrow" className="h-4 w-4 text-(--accent)" /></a>
        </div>

        <div className="border-t border-(--line) pt-6">
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">{t("Full name")}
              <input name="name" required autoComplete="name" placeholder={t("Your name")} className={input} />
            </label>
            <label className="grid gap-2 text-sm font-semibold">{t("Phone number")}
              <input name="phone" required type="tel" autoComplete="tel" placeholder={t("How can we reach you?")} className={input} />
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">{t("Email address")}
              <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" className={input} />
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">{t("What are you looking for?")}
              <select name="service" defaultValue="" required className={input}>
                <option value="" disabled>{t("Select a service")}</option>
                {SERVICES.map((service) => <option key={service.title} value={service.title}>{t(service.title)}</option>)}
                <optgroup label="Roofing products">
                  <option value="Longspan">Longspan</option>
                  <option value="Steptiles">Steptiles</option>
                  <option value="Metrocopo">Metrocopo</option>
                </optgroup>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">{t("A little about your project")} <span className="font-normal text-(--muted)">{t("(optional)")}</span>
              <textarea name="message" rows={4} placeholder={t("Project type, dimensions, location or timing")} className={`${input} resize-y`} />
            </label>
            <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-3 bg-(--accent) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#963d2a] sm:col-span-2 sm:justify-self-start">
              {isSubmitting ? t("Sending...") : t("Send message")} <Icon name="arrow" className="h-4 w-4" />
            </button>
          </form>
          {submissionStatus && <p role="status" aria-live="polite" className="mt-4 text-sm leading-6 text-(--muted)">{submissionStatus}</p>}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-(--paper)">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto_auto] lg:px-12">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-(--muted)">{t("Aluminium windows, doors and architectural systems for residential and commercial spaces.")}</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">{t("Explore")}</h4>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.filter((link) => link.href !== "#contact").map((link) => (
              <li key={link.href}><a href={link.href} className="text-(--muted) transition-colors hover:text-(--accent)">{t(link.label)}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">{t("Start a project")}</h4>
          <a href="#contact" className="text-sm text-(--muted) underline decoration-(--accent) underline-offset-4">{t("Get in touch")}</a>
        </div>
      </div>
      <div className="border-t border-(--line) px-5 py-5 text-sm text-(--muted) sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} OYE Aluminum</span><span>{t("Made for lasting everyday use.")}</span></div>
      </div>
    </footer>
  );
}
