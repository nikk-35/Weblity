import { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowRight, Check, Star, Zap, Globe, Smartphone, ShoppingBag, Code, ChevronRight, Mail, Instagram, Linkedin, MousePointer2, Sparkles, Layers } from 'lucide-react'

// === SCROLL REVEAL HOOK ===
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// === MOUSE GLOW HOOK ===
function useMouseGlow(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      el.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [ref])
}

// === LOGO ===
function Logo({ size = 'default' }: { size?: 'default' | 'large' | 'hero' }) {
  const sizes = { default: 'text-2xl', large: 'text-5xl md:text-6xl', hero: 'text-6xl md:text-8xl lg:text-9xl' }
  return (
    <span className={`font-extrabold ${sizes[size]} tracking-tight`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <span className="text-white">web</span>
      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">lity</span>
    </span>
  )
}

// === NAVBAR ===
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-strong py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="relative group">
          <Logo />
          <span className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Leistungen', 'Pakete', 'Prozess', 'Kontakt'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium group py-1">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#kontakt" className="magnetic-btn px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600">
            Projekt starten
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-4 glass-strong mx-4 rounded-2xl mt-2">
          {['Leistungen', 'Pakete', 'Prozess', 'Kontakt'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-gray-300 py-2 text-lg">{item}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// === HERO ===
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 30, y: (e.clientY / window.innerHeight - 0.5) * 30 })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-blob-delay" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-blob-delay2" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10 animate-float"
          style={{ animation: 'slide-up 0.8s cubic-bezier(0.16,1,0.3,1) both, float 6s ease-in-out infinite 0.8s' }}>
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-sm text-gray-300 font-medium">Websites die begeistern</span>
        </div>

        {/* Logo / Title */}
        <div style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`, transition: 'transform 0.3s ease-out', animation: 'scale-in 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
          <h1 className="mb-6 text-glow">
            <Logo size="hero" />
          </h1>
        </div>

        {/* Subtitle with shimmer */}
        <p className="text-xl md:text-3xl text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed font-light"
          style={{ animation: 'slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both' }}>
          Moderne Websites, die dein Business{' '}
          <span className="text-white font-semibold relative">
            auf das nächste Level
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse-glow" />
          </span>{' '}
          bringen.
        </p>

        <p className="text-gray-500 mb-12 text-lg font-light tracking-wide"
          style={{ animation: 'slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both' }}>
          Schnell · Bezahlbar · Professionell
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center" style={{ animation: 'slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}>
          <a href="#kontakt" className="magnetic-btn group px-10 py-5 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 text-lg flex items-center justify-center gap-3">
            Projekt starten
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
          <a href="#pakete" className="group px-10 py-5 rounded-2xl font-semibold text-gray-300 glass hover:bg-white/[0.08] transition-all duration-300 text-lg flex items-center justify-center gap-3">
            Pakete ansehen
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-bounce" style={{ animation: 'slide-up 0.8s cubic-bezier(0.16,1,0.3,1) 1.2s both, bounce 2s infinite 2s' }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 mx-auto flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-white/40 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

// === SERVICES ===
function Services() {
  const ref = useReveal()
  const services = [
    { icon: Globe, title: 'Websites', desc: 'Landingpages, Unternehmensseiten, Portfolios — modern und blitzschnell.', gradient: 'from-cyan-400 to-blue-500' },
    { icon: ShoppingBag, title: 'Online Shops', desc: 'Verkaufe deine Produkte online. Von einfach bis komplex.', gradient: 'from-purple-400 to-pink-500' },
    { icon: Smartphone, title: 'Web Apps', desc: 'Interaktive Anwendungen die auf jedem Gerät perfekt laufen.', gradient: 'from-orange-400 to-red-500' },
    { icon: Code, title: 'Wartung & Support', desc: 'Updates, Hosting, Änderungen — wir kümmern uns um alles.', gradient: 'from-green-400 to-emerald-500' },
  ]

  return (
    <section id="leistungen" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-20">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">Leistungen</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Was wir{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">machen</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Alles aus einer Hand — von der Idee bis zum fertigen Produkt.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => {
            const cardRef = useReveal()
            return (
              <div key={i} ref={cardRef} className="reveal glass-card rounded-2xl p-8 group" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <s.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors duration-300">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Mehr erfahren <ArrowRight size={14} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// === PACKAGES ===
function Packages() {
  const ref = useReveal()

  const packages = [
    {
      name: 'Starter',
      price: '499',
      desc: 'Perfekt für den Einstieg',
      features: ['Landingpage (1 Seite)', 'Responsive Design', 'Kontaktformular', 'SEO Grundlagen', 'SSL Zertifikat', '1 Korrekturschleife'],
      highlight: false,
      icon: MousePointer2,
    },
    {
      name: 'Business',
      price: '1.299',
      desc: 'Für wachsende Unternehmen',
      features: ['Bis zu 7 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Optimierung', 'Google Analytics', 'CMS System', '3 Korrekturschleifen', 'Social Media Integration'],
      highlight: true,
      icon: Layers,
    },
    {
      name: 'Premium',
      price: '2.999',
      desc: 'Maximale Performance',
      features: ['Bis zu 15 Seiten', 'Individuelles Design', 'Online Shop möglich', 'SEO + Performance', 'CMS System', 'Animations & Effekte', 'Unbegrenzte Korrekturen', 'Priority Support 12 Monate'],
      highlight: false,
      icon: Sparkles,
    },
  ]

  return (
    <section id="pakete" className="py-32 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className="reveal text-center mb-20">
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4">Pakete</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Transparent.{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Fair.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Keine versteckten Kosten. Keine bösen Überraschungen.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, i) => {
            const cardRef = useReveal()
            return (
              <div key={i} ref={cardRef} className="reveal" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className={`relative rounded-3xl p-8 transition-all duration-500 ${
                  pkg.highlight
                    ? 'glass-strong scale-105 glow-cyan'
                    : 'glass-card'
                }`}>
                  {pkg.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-xs font-bold tracking-wider animate-pulse-glow">
                      ✨ BELIEBT
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${pkg.highlight ? 'bg-gradient-to-br from-cyan-500 to-purple-600' : 'bg-white/5'}`}>
                    <pkg.icon size={22} className={pkg.highlight ? 'text-white' : 'text-gray-400'} />
                  </div>

                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{pkg.name}</h3>
                  <p className="text-gray-400 text-sm mb-8">{pkg.desc}</p>

                  <div className="mb-8">
                    <span className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">€{pkg.price}</span>
                    <span className="text-gray-500 text-sm ml-2">einmalig</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="#kontakt" className={`magnetic-btn block text-center py-4 rounded-2xl font-semibold transition-all ${
                    pkg.highlight
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                      : 'glass text-gray-300 hover:text-white'
                  }`}>
                    Jetzt starten
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-gray-500 mt-16 text-sm">
          Individuelle Anforderungen?{' '}
          <a href="#kontakt" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-cyan-400/30 hover:decoration-cyan-400 transition-all">
            Schreib uns
          </a>
        </p>
      </div>
    </section>
  )
}

// === PROCESS ===
function Process() {
  const ref = useReveal()
  const steps = [
    { num: '01', title: 'Gespräch', desc: 'Wir lernen dich und dein Business kennen. Was brauchst du?' },
    { num: '02', title: 'Konzept', desc: 'Wir erstellen Design-Entwürfe. Du gibst Feedback.' },
    { num: '03', title: 'Umsetzung', desc: 'Wir bauen deine Website. Modern, schnell, responsive.' },
    { num: '04', title: 'Launch', desc: 'Deine Website geht live. Wir kümmern uns um alles.' },
  ]

  return (
    <section id="prozess" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={ref} className="reveal text-center mb-20">
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">Prozess</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            In 4 Schritten{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">online</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20" />

          {steps.map((step, i) => {
            const stepRef = useReveal()
            return (
              <div key={i} ref={stepRef} className="reveal text-center group" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-3xl glass-card flex items-center justify-center group-hover:glow-cyan transition-all duration-500">
                    <span className="text-3xl font-black bg-gradient-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {step.num}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// === TESTIMONIALS ===
function Testimonials() {
  const ref = useReveal()
  const reviews = [
    { name: 'Laura M.', role: 'Yoga Studio', text: 'Endlich eine Website auf die ich stolz bin! Super schnell und unkompliziert.', avatar: '👩‍🦰' },
    { name: 'Markus B.', role: 'IT-Service', text: 'Professionell, modern und das zu einem fairen Preis. Klare Empfehlung!', avatar: '👨‍💼' },
    { name: 'Sarah K.', role: 'Freelancerin', text: 'Mein Portfolio sieht jetzt richtig premium aus. Die Zusammenarbeit war mega smooth.', avatar: '👩‍🎨' },
  ]

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-20">
          <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4">Kundenstimmen</p>
          <h2 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Das sagen unsere{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Kunden</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((t, i) => {
            const cardRef = useReveal()
            return (
              <div key={i} ref={cardRef} className="reveal glass-card rounded-2xl p-8" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex gap-1 mb-6">
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-300 text-sm mb-8 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// === CTA BANNER ===
function CtaBanner() {
  const ref = useReveal()
  return (
    <section className="py-20 px-6">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="gradient-border rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-blob" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] animate-blob-delay" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-glow" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Bereit für deine neue Website?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto">
              Lass uns gemeinsam etwas Großartiges bauen.
            </p>
            <a href="#kontakt" className="magnetic-btn inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 text-lg">
              Kostenloses Erstgespräch
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// === CONTACT ===
function Contact() {
  const ref = useReveal()
  return (
    <section id="kontakt" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4">Kontakt</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Lass uns{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">starten</span>
          </h2>
          <p className="text-gray-400 text-lg">Schreib uns — wir melden uns innerhalb von 24 Stunden.</p>
        </div>

        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Nachricht gesendet! Wir melden uns bei dir.') }}>
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Dein Name" required
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-300" />
              <input type="email" placeholder="Deine E-Mail" required
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-300" />
            </div>
            <select className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all duration-300 appearance-none">
              <option value="">Welches Paket interessiert dich?</option>
              <option value="starter">Starter — €499</option>
              <option value="business">Business — €1.299</option>
              <option value="premium">Premium — €2.999</option>
              <option value="custom">Individuell</option>
            </select>
            <textarea placeholder="Erzähl uns von deinem Projekt..." rows={5} required
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-300 resize-none" />
            <button type="submit"
              className="magnetic-btn w-full py-5 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 text-lg">
              Nachricht senden ✨
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

// === FOOTER ===
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-white transition-colors duration-300">Impressum</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Datenschutz</a>
        </div>
        <div className="flex items-center gap-5">
          {[Instagram, Linkedin, Mail].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <div className="text-center text-gray-600 text-xs mt-8">
        © {new Date().getFullYear()} Weblity. Alle Rechte vorbehalten.
      </div>
    </footer>
  )
}

// === APP ===
function App() {
  return (
    <div className="noise">
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <Process />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
