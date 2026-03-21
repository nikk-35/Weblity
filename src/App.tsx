import { useState, useEffect, useRef, type ReactNode } from 'react'
import { Menu, X, ArrowRight, Check, Star, Zap, Globe, Smartphone, ShoppingBag, Code, ChevronRight, Mail, Instagram, Linkedin, MousePointer2, Sparkles, Layers } from 'lucide-react'

// === ANIMATE ON SCROLL ===
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// === LOGO ===
function Logo({ size = 'default' }: { size?: 'default' | 'hero' }) {
  const s = size === 'hero' ? 'text-7xl md:text-9xl' : 'text-2xl'
  return (
    <span className={`font-extrabold ${s} tracking-tight`} style={{ fontFamily: 'Poppins, sans-serif' }}>
      <span className="text-white">web</span>
      <span style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>lity</span>
    </span>
  )
}

// === GLASS CARD ===
function GlassCard({ children, hover = true, glow = false, className = '' }: { children: ReactNode; hover?: boolean; glow?: boolean; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '1.5rem',
        padding: '2rem',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        ...(glow ? { boxShadow: '0 0 40px rgba(0,212,255,0.12), 0 0 80px rgba(123,47,247,0.06)' } : {}),
      }}
      onMouseEnter={hover ? (e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-8px) scale(1.02)'
        el.style.borderColor = 'rgba(255,255,255,0.16)'
        el.style.boxShadow = '0 30px 60px -12px rgba(0,212,255,0.15), 0 0 40px rgba(123,47,247,0.08)'
      } : undefined}
      onMouseLeave={hover ? (e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ''
        el.style.borderColor = 'rgba(255,255,255,0.08)'
        el.style.boxShadow = glow ? '0 0 40px rgba(0,212,255,0.12)' : 'none'
      } : undefined}
    >
      {children}
    </div>
  )
}

// === GRADIENT BUTTON ===
function GradientBtn({ children, href, large = false, className = '' }: { children: ReactNode; href: string; large?: boolean; className?: string }) {
  return (
    <a
      href={href}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: large ? '1.25rem 2.5rem' : '0.75rem 1.75rem',
        borderRadius: '1rem',
        fontWeight: 600,
        fontSize: large ? '1.125rem' : '0.875rem',
        color: '#fff',
        background: 'linear-gradient(135deg, #00b4d8, #7b2ff7)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        border: 'none',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-3px) scale(1.03)'
        el.style.boxShadow = '0 20px 40px rgba(0,212,255,0.3), 0 0 60px rgba(123,47,247,0.15)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = ''
        el.style.boxShadow = 'none'
      }}
    >
      {children}
    </a>
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
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      background: scrolled ? 'rgba(10,15,28,0.85)' : 'rgba(10,15,28,0.5)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      transition: 'all 0.5s ease',
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: scrolled ? '0.75rem 1.5rem' : '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'padding 0.5s ease' }}>
        <a href="#" style={{ textDecoration: 'none' }}><Logo /></a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden md:flex">
          {['Leistungen', 'Pakete', 'Prozess', 'Kontakt'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
              transition: 'color 0.3s',
            }} onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}>
              {item}
            </a>
          ))}
          <GradientBtn href="#kontakt">Projekt starten</GradientBtn>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: '#fff', background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden" style={{ padding: '0 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['Leistungen', 'Pakete', 'Prozess', 'Kontakt'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ color: '#d1d5db', textDecoration: 'none', padding: '0.5rem 0', fontSize: '1.125rem' }}>
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// === HERO ===
function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 1.5rem 4rem' }}>
      {/* Blobs */}
      <div style={{ position: 'absolute', top: '15%', left: '15%', width: '500px', height: '500px', background: 'rgba(0,212,255,0.12)', borderRadius: '50%', filter: 'blur(100px)', animation: 'blob 12s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: '400px', height: '400px', background: 'rgba(123,47,247,0.12)', borderRadius: '50%', filter: 'blur(100px)', animation: 'blob 12s ease-in-out infinite 4s' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '60rem', margin: '0 auto' }}>
        {/* Badge */}
        <Reveal>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.625rem 1.25rem', borderRadius: '9999px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '2.5rem', animation: 'float 6s ease-in-out infinite',
          }}>
            <Sparkles size={14} style={{ color: '#00d4ff' }} />
            <span style={{ fontSize: '0.875rem', color: '#d1d5db', fontWeight: 500 }}>Websites die begeistern</span>
          </div>
        </Reveal>

        {/* Logo */}
        <Reveal delay={200}>
          <h1 style={{ marginBottom: '1.5rem', textShadow: '0 0 60px rgba(0,212,255,0.2), 0 0 120px rgba(123,47,247,0.1)' }}>
            <Logo size="hero" />
          </h1>
        </Reveal>

        <Reveal delay={400}>
          <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#9ca3af', marginBottom: '1rem', maxWidth: '48rem', margin: '0 auto 1rem', lineHeight: 1.6, fontWeight: 300 }}>
            Moderne Websites, die dein Business{' '}
            <span style={{ color: '#fff', fontWeight: 600 }}>auf das nächste Level</span>{' '}bringen.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <p style={{ color: '#6b7280', marginBottom: '3rem', fontSize: '1.125rem', fontWeight: 300, letterSpacing: '0.15em' }}>
            Schnell · Bezahlbar · Professionell
          </p>
        </Reveal>

        <Reveal delay={800}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }} className="sm:flex-row sm:justify-center">
            <GradientBtn href="#kontakt" large>
              Projekt starten <ArrowRight size={20} />
            </GradientBtn>
            <a href="#pakete" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '1.25rem 2.5rem', borderRadius: '1rem', fontWeight: 600,
              color: '#d1d5db', fontSize: '1.125rem', textDecoration: 'none',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            >
              Pakete ansehen <ChevronRight size={20} />
            </a>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <Reveal delay={1200}>
          <div style={{ marginTop: '5rem' }}>
            <div style={{ width: '1.5rem', height: '2.5rem', borderRadius: '9999px', border: '2px solid rgba(255,255,255,0.2)', margin: '0 auto', display: 'flex', justifyContent: 'center', paddingTop: '0.5rem' }}>
              <div style={{ width: '3px', height: '8px', borderRadius: '9999px', background: 'rgba(255,255,255,0.4)', animation: 'pulse 2s ease-in-out infinite' }} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// === SECTION HEADER ===
function SectionHeader({ label, labelColor, title, highlight, desc }: { label: string; labelColor: string; title: string; highlight: string; desc: string }) {
  return (
    <Reveal>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ color: labelColor, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>{label}</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
          {title}{' '}
          <span style={{ background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{highlight}</span>
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1.125rem', maxWidth: '36rem', margin: '0 auto' }}>{desc}</p>
      </div>
    </Reveal>
  )
}

// === SERVICES ===
function Services() {
  const services = [
    { icon: Globe, title: 'Websites', desc: 'Landingpages, Unternehmensseiten, Portfolios — modern und blitzschnell.', gradient: 'linear-gradient(135deg, #00d4ff, #0077b6)' },
    { icon: ShoppingBag, title: 'Online Shops', desc: 'Verkaufe deine Produkte online. Von einfach bis komplex.', gradient: 'linear-gradient(135deg, #7b2ff7, #c471f5)' },
    { icon: Smartphone, title: 'Web Apps', desc: 'Interaktive Anwendungen die auf jedem Gerät perfekt laufen.', gradient: 'linear-gradient(135deg, #f97316, #ef4444)' },
    { icon: Code, title: 'Wartung & Support', desc: 'Updates, Hosting, Änderungen — wir kümmern uns um alles.', gradient: 'linear-gradient(135deg, #22c55e, #10b981)' },
  ]

  return (
    <section id="leistungen" style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <SectionHeader label="Leistungen" labelColor="#00d4ff" title="Was wir" highlight="machen" desc="Alles aus einer Hand — von der Idee bis zum fertigen Produkt." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <GlassCard>
                <div style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
                  background: s.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem', transition: 'transform 0.5s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}>
                  <s.icon size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.7 }}>{s.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// === PACKAGES ===
function Packages() {
  const packages = [
    {
      name: 'Starter', price: '499', desc: 'Perfekt für den Einstieg', icon: MousePointer2, highlight: false,
      features: ['Landingpage (1 Seite)', 'Responsive Design', 'Kontaktformular', 'SEO Grundlagen', 'SSL Zertifikat', '1 Korrekturschleife'],
    },
    {
      name: 'Business', price: '1.299', desc: 'Für wachsende Unternehmen', icon: Layers, highlight: true,
      features: ['Bis zu 7 Seiten', 'Responsive Design', 'Kontaktformular', 'SEO Optimierung', 'Google Analytics', 'CMS System', '3 Korrekturschleifen', 'Social Media Integration'],
    },
    {
      name: 'Premium', price: '2.999', desc: 'Maximale Performance', icon: Sparkles, highlight: false,
      features: ['Bis zu 15 Seiten', 'Individuelles Design', 'Online Shop möglich', 'SEO + Performance', 'CMS System', 'Animations & Effekte', 'Unbegrenzte Korrekturen', 'Priority Support 12 Monate'],
    },
  ]

  return (
    <section id="pakete" style={{ padding: '8rem 1.5rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(0,212,255,0.06), transparent)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <SectionHeader label="Pakete" labelColor="#7b2ff7" title="Transparent." highlight="Fair." desc="Keine versteckten Kosten. Keine bösen Überraschungen." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {packages.map((pkg, i) => (
            <Reveal key={i} delay={i * 150}>
              <div style={{ position: 'relative' }}>
                {pkg.highlight && (
                  <div style={{
                    position: 'absolute', top: '-1rem', left: '50%', transform: 'translateX(-50%)',
                    padding: '0.375rem 1.25rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                    background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', color: '#fff', letterSpacing: '0.05em', zIndex: 10,
                  }}>
                    ✨ BELIEBT
                  </div>
                )}
                <GlassCard glow={pkg.highlight} hover={!pkg.highlight} className={pkg.highlight ? '' : ''}>
                  <div style={{
                    width: '3rem', height: '3rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                    background: pkg.highlight ? 'linear-gradient(135deg, #00d4ff, #7b2ff7)' : 'rgba(255,255,255,0.05)',
                  }}>
                    <pkg.icon size={20} color={pkg.highlight ? '#fff' : '#9ca3af'} />
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif' }}>{pkg.name}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '2rem' }}>{pkg.desc}</p>

                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{ fontSize: '3rem', fontWeight: 700 }}>€{pkg.price}</span>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '0.5rem' }}>einmalig</span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {pkg.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: '#d1d5db' }}>
                        <Check size={16} color="#00d4ff" style={{ marginTop: '2px', flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {pkg.highlight ? (
                    <GradientBtn href="#kontakt" className="w-full" large>Jetzt starten</GradientBtn>
                  ) : (
                    <a href="#kontakt" style={{
                      display: 'block', textAlign: 'center', padding: '1rem', borderRadius: '1rem',
                      fontWeight: 600, color: '#d1d5db', border: '1px solid rgba(255,255,255,0.1)',
                      textDecoration: 'none', transition: 'all 0.3s ease',
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d1d5db' }}
                    >
                      Jetzt starten
                    </a>
                  )}
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '4rem', fontSize: '0.875rem' }}>
            Individuelle Anforderungen?{' '}
            <a href="#kontakt" style={{ color: '#00d4ff', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Schreib uns</a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// === PROCESS ===
function Process() {
  const steps = [
    { num: '01', title: 'Gespräch', desc: 'Wir lernen dich und dein Business kennen.' },
    { num: '02', title: 'Konzept', desc: 'Design-Entwürfe und dein Feedback.' },
    { num: '03', title: 'Umsetzung', desc: 'Wir bauen deine Website. Modern & schnell.' },
    { num: '04', title: 'Launch', desc: 'Go live! Wir kümmern uns um alles.' },
  ]

  return (
    <section id="prozess" style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <SectionHeader label="Prozess" labelColor="#f97316" title="In 4 Schritten" highlight="online" desc="Von der Idee zur fertigen Website." />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 150}>
              <div style={{ textAlign: 'center' }}>
                <GlassCard hover>
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Poppins, sans-serif',
                    background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    marginBottom: '1rem',
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', lineHeight: 1.7 }}>{step.desc}</p>
                </GlassCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// === TESTIMONIALS ===
function Testimonials() {
  const reviews = [
    { name: 'Laura M.', role: 'Yoga Studio', text: 'Endlich eine Website auf die ich stolz bin! Super schnell und unkompliziert.', avatar: '👩‍🦰' },
    { name: 'Markus B.', role: 'IT-Service', text: 'Professionell, modern und das zu einem fairen Preis. Klare Empfehlung!', avatar: '👨‍💼' },
    { name: 'Sarah K.', role: 'Freelancerin', text: 'Mein Portfolio sieht jetzt richtig premium aus. Zusammenarbeit war mega smooth.', avatar: '👩‍🎨' },
  ]

  return (
    <section style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <SectionHeader label="Kundenstimmen" labelColor="#eab308" title="Das sagen unsere" highlight="Kunden" desc="" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {reviews.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <GlassCard>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem' }}>
                  {Array(5).fill(0).map((_, j) => <Star key={j} size={16} color="#eab308" fill="#eab308" />)}
                </div>
                <p style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '2rem', lineHeight: 1.8, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{t.avatar}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.75rem' }}>{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// === CTA BANNER ===
function CtaBanner() {
  return (
    <section style={{ padding: '5rem 1.5rem' }}>
      <Reveal>
        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
          <div style={{
            borderRadius: '2rem', padding: 'clamp(3rem, 5vw, 5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(123,47,247,0.08))',
            border: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'rgba(0,212,255,0.1)', borderRadius: '50%', filter: 'blur(80px)', animation: 'blob 12s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '300px', height: '300px', background: 'rgba(123,47,247,0.1)', borderRadius: '50%', filter: 'blur(80px)', animation: 'blob 12s ease-in-out infinite 4s' }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'Poppins, sans-serif', textShadow: '0 0 40px rgba(0,212,255,0.2)' }}>
                Bereit für deine neue Website?
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '1.125rem', marginBottom: '2.5rem', maxWidth: '32rem', margin: '0 auto 2.5rem' }}>
                Lass uns gemeinsam etwas Großartiges bauen.
              </p>
              <GradientBtn href="#kontakt" large>
                Kostenloses Erstgespräch <ArrowRight size={20} />
              </GradientBtn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// === CONTACT ===
function Contact() {
  const inputStyle = {
    width: '100%', padding: '1rem 1.5rem', borderRadius: '1rem', fontSize: '1rem',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', outline: 'none', transition: 'border-color 0.3s ease',
    fontFamily: 'Inter, sans-serif',
  }

  return (
    <section id="kontakt" style={{ padding: '8rem 1.5rem' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <SectionHeader label="Kontakt" labelColor="#00d4ff" title="Lass uns" highlight="starten" desc="Schreib uns — wir melden uns innerhalb von 24 Stunden." />

        <Reveal delay={200}>
          <GlassCard hover={false}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={(e) => { e.preventDefault(); alert('Nachricht gesendet! Wir melden uns bei dir.') }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <input type="text" placeholder="Dein Name" required style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
                <input type="email" placeholder="Deine E-Mail" required style={inputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
              </div>
              <select style={{ ...inputStyle, color: '#6b7280', appearance: 'none' as const }}>
                <option value="">Welches Paket interessiert dich?</option>
                <option value="starter">Starter — €499</option>
                <option value="business">Business — €1.299</option>
                <option value="premium">Premium — €2.999</option>
                <option value="custom">Individuell</option>
              </select>
              <textarea placeholder="Erzähl uns von deinem Projekt..." rows={5} required
                style={{ ...inputStyle, resize: 'none' as const }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'} />
              <button type="submit" style={{
                width: '100%', padding: '1.25rem', borderRadius: '1rem', fontWeight: 600,
                fontSize: '1.125rem', color: '#fff', border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #00b4d8, #7b2ff7)',
                transition: 'all 0.4s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,212,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = '' }}
              >
                Nachricht senden ✨
              </button>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}

// === FOOTER ===
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '0.875rem' }}>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>Impressum</a>
          <a href="#" style={{ color: '#6b7280', textDecoration: 'none', transition: 'color 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}>Datenschutz</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {[Instagram, Linkedin, Mail].map((Icon, i) => (
            <a key={i} href="#" style={{
              width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#9ca3af', textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.75rem', marginTop: '2rem' }}>
        © {new Date().getFullYear()} Weblity. Alle Rechte vorbehalten.
      </div>
    </footer>
  )
}

// === APP ===
function App() {
  return (
    <>
      <style>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 25%{transform:translate(30px,-50px) scale(1.1)} 50%{transform:translate(-20px,20px) scale(0.9)} 75%{transform:translate(20px,40px) scale(1.05)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        .hidden { display: none !important; }
        @media (min-width: 768px) { .md\\:flex { display: flex !important; } }
        @media (min-width: 640px) { .sm\\:flex-row { flex-direction: row !important; } .sm\\:justify-center { justify-content: center !important; } }
        .w-full { width: 100%; }
        ::selection { background: rgba(0,212,255,0.3); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0f1c; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 3px; }
      `}</style>
      <Navbar />
      <Hero />
      <Services />
      <Packages />
      <Process />
      <Testimonials />
      <CtaBanner />
      <Contact />
      <Footer />
    </>
  )
}

export default App
