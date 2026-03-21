import { useState } from 'react'
import { Menu, X, ArrowRight, Check, Star, Zap, Globe, Smartphone, ShoppingBag, Code, ChevronRight, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react'

function Logo({ size = 'default' }: { size?: 'default' | 'large' }) {
  const textSize = size === 'large' ? 'text-5xl md:text-7xl' : 'text-2xl'
  return (
    <span className={`font-extrabold ${textSize} tracking-tight`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <span className="text-white">web</span>
      <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">lity</span>
    </span>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0a0f1c]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#"><Logo /></a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#leistungen" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Leistungen</a>
          <a href="#pakete" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Pakete</a>
          <a href="#prozess" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">So arbeiten wir</a>
          <a href="#kontakt" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
            Kontakt
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-[#0a0f1c]/95 backdrop-blur-xl">
          <a href="#leistungen" onClick={() => setOpen(false)} className="text-gray-300 py-2">Leistungen</a>
          <a href="#pakete" onClick={() => setOpen(false)} className="text-gray-300 py-2">Pakete</a>
          <a href="#prozess" onClick={() => setOpen(false)} className="text-gray-300 py-2">So arbeiten wir</a>
          <a href="#kontakt" onClick={() => setOpen(false)} className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 text-center">
            Kontakt
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8 text-sm text-gray-300">
          <Zap size={14} className="text-cyan-400" />
          Websites die begeistern
        </div>

        <h1 className="mb-6">
          <Logo size="large" />
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
          Moderne Websites, die dein Business
          <span className="text-white font-semibold"> auf das nächste Level</span> bringen.
        </p>
        <p className="text-gray-500 mb-10 text-lg">
          Schnell. Bezahlbar. Professionell.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#kontakt" className="group px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-xl hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2">
            Projekt starten
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#pakete" className="px-8 py-4 rounded-full font-semibold text-gray-300 border border-white/10 hover:bg-white/5 transition-all">
            Pakete ansehen
          </a>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { icon: Globe, title: 'Websites', desc: 'Landingpages, Unternehmensseiten, Portfolios — modern und blitzschnell.', color: 'from-cyan-400 to-cyan-600' },
    { icon: ShoppingBag, title: 'Online Shops', desc: 'Verkaufe deine Produkte online. Von einfach bis komplex.', color: 'from-purple-400 to-purple-600' },
    { icon: Smartphone, title: 'Web Apps', desc: 'Interaktive Anwendungen die auf jedem Gerät perfekt laufen.', color: 'from-pink-400 to-pink-600' },
    { icon: Code, title: 'Wartung & Support', desc: 'Updates, Hosting, Änderungen — wir kümmern uns um alles.', color: 'from-orange-400 to-orange-600' },
  ]

  return (
    <section id="leistungen" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Was wir <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">machen</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Alles aus einer Hand — von der Idee bis zum fertigen Produkt.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Packages() {
  const packages = [
    {
      name: 'Starter',
      price: '499',
      desc: 'Perfekt für den Einstieg',
      features: ['Landingpage (1 Seite)', 'Responsive Design', 'Kontaktformular', 'SEO Grundlagen', 'SSL Zertifikat', '1 Korrekturschleife'],
      highlight: false,
    },
    {
      name: 'Business',
      price: '1.299',
      desc: 'Für wachsende Unternehmen',
      features: ['Bis zu 7 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Optimierung', 'Google Analytics', 'CMS (Inhalte selbst ändern)', '3 Korrekturschleifen', 'Social Media Integration'],
      highlight: true,
    },
    {
      name: 'Premium',
      price: '2.999',
      desc: 'Maximale Performance',
      features: ['Bis zu 15 Seiten', 'Individuelles Design', 'Online Shop möglich', 'SEO + Performance', 'CMS System', 'Animations & Effekte', 'Unbegrenzte Korrekturen', 'Priority Support 12 Monate'],
      highlight: false,
    },
  ]

  return (
    <section id="pakete" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Unsere <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Pakete</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Transparent. Fair. Keine versteckten Kosten.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                pkg.highlight
                  ? 'border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-purple-500/5 scale-105'
                  : 'border-white/5 bg-white/[0.02] hover:border-white/10'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-xs font-bold">
                  BELIEBT
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{pkg.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{pkg.desc}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">€{pkg.price}</span>
                <span className="text-gray-400 text-sm ml-2">einmalig</span>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#kontakt"
                className={`block text-center py-3.5 rounded-full font-semibold transition-all ${
                  pkg.highlight
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/20'
                    : 'border border-white/10 text-gray-300 hover:bg-white/5'
                }`}
              >
                Jetzt starten
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12 text-sm">
          Individuelle Anforderungen? <a href="#kontakt" className="text-cyan-400 hover:underline">Schreib uns</a> für ein maßgeschneidertes Angebot.
        </p>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { num: '01', title: 'Gespräch', desc: 'Wir lernen dich und dein Business kennen. Was brauchst du? Was ist das Ziel?' },
    { num: '02', title: 'Konzept', desc: 'Wir erstellen ein Konzept und Design-Vorschlag. Du gibst Feedback.' },
    { num: '03', title: 'Umsetzung', desc: 'Wir bauen deine Website. Modern, schnell, responsive.' },
    { num: '04', title: 'Launch', desc: 'Deine Website geht live. Wir kümmern uns um alles Technische.' },
  ]

  return (
    <section id="prozess" className="py-32 px-6 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            So <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">arbeiten</span> wir
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Von der Idee zur fertigen Website in 4 Schritten.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center group">
              <div className="text-6xl font-black bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <ChevronRight size={20} className="text-gray-600 mx-auto mt-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Das sagen unsere <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Kunden</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Laura M.', role: 'Inhaberin, Yoga Studio', text: 'Endlich eine Website auf die ich stolz bin! Super schnell und unkompliziert.' },
            { name: 'Markus B.', role: 'Geschäftsführer, IT-Service', text: 'Professionell, modern und das zu einem fairen Preis. Klare Empfehlung!' },
            { name: 'Sarah K.', role: 'Freelancerin, Design', text: 'Die Zusammenarbeit war mega smooth. Mein Portfolio sieht jetzt richtig premium aus.' },
          ].map((t, i) => (
            <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="flex gap-1 mb-4">
                {Array(5).fill(0).map((_, j) => <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed italic">"{t.text}"</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="kontakt" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Lass uns <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">starten</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Schreib uns — wir melden uns innerhalb von 24 Stunden.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Nachricht gesendet! Wir melden uns bei dir.') }}>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Dein Name"
              required
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <input
              type="email"
              placeholder="Deine E-Mail"
              required
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <select
            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
          >
            <option value="">Welches Paket interessiert dich?</option>
            <option value="starter">Starter — €499</option>
            <option value="business">Business — €1.299</option>
            <option value="premium">Premium — €2.999</option>
            <option value="custom">Individuell</option>
          </select>
          <textarea
            placeholder="Erzähl uns von deinem Projekt..."
            rows={5}
            required
            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:shadow-xl hover:shadow-cyan-500/20 transition-all text-lg"
          >
            Nachricht senden
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors">Impressum</a>
          <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs mt-8">
        © {new Date().getFullYear()} Weblity. Alle Rechte vorbehalten.
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App
