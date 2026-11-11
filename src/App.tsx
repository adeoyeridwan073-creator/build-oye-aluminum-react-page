import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { About, Process, Products, Services } from "./components/Sections";
import Estimator from "./components/Estimator";
import { Contact, Footer } from "./components/Contact";
import { LanguageProvider } from "./i18n";

export default function App() {
  return (
    <LanguageProvider>
      <div className="overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Products />
          <About />
          <Process />
          <Estimator />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
