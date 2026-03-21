import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { Menu, X, ArrowRight, Check, Star, Globe, Smartphone, ShoppingBag, Code, Mail, Instagram, Linkedin, Sparkles, Play } from 'lucide-react'

// ============================================================================
// HOOKS
// ============================================================================

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return progress
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const viewCenter = window.innerHeight / 2
      setOffset((center - viewCenter) * speed * -0.1)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [speed])
  return { ref, offset }
}

// ============================================================================
// COMPONENTS
// ============================================================================

const FadeIn = ({ children, delay = 0, y = 60, className = '', style = {} }: { children: ReactNode; delay?: number; y?: number; className?: string; style?: CSSProperties }) => {
  const { ref, inView } = useInView(0.15)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const Logo = ({ size = 'sm' }: { size?: 'sm' | 'lg' | 'xl' }) => {
  const sizes = { sm: '1.75rem', lg: '4rem', xl: 'clamp(4rem, 12vw, 9rem)' }
  return (
    <span style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700, fontSize: sizes[size], letterSpacing: '-0.03em' }}>
      <span style={{ color: '#fff' }}>web</span>
      <span style={{ background: 'linear-gradient(135deg, #2997ff, #af52de)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>lity</span>
    </span>
  )
}

const GlowButton = ({ children, href, variant = 'primary', size = 'md' }: { children: ReactNode; href: string; variant?: 'primary' | 'secondary'; size?: 'md' | 'lg' }) => {
  const [hover, setHover] = useState(false)
  const isPrimary = variant === 'primary'
  const isLg = size === 'lg'
  
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: isLg ? '1.125rem 2.25rem' : '0.875rem 1.75rem',
        borderRadius: '980px',
        fontSize: isLg ? '1.125rem' : '1rem',
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        ...(isPrimary ? {
          background: '#2997ff',
          color: '#fff',
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          boxShadow: hover ? '0 0 0 4px rgba(41, 151, 255, 0.3), 0 20px 40px rgba(41, 151, 255, 0.3)' : 'none',
        } : {
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#fff',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          transform: hover ? 'scale(1.04)' : 'scale(1)',
        }),
      }}
    >
      {children}
    </a>
  )
}

const Card = ({ children, hover = true, glow = false, style = {} }: { children: ReactNode; hover?: boolean; glow?: boolean; style?: CSSProperties }) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        borderRadius: '24px',
        border: `1px solid rgba(255, 255, 255, ${isHover && hover ? 0.15 : 0.08})`,
        padding: '2rem',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHover && hover ? 'translateY(-8px) scale(1.02)' : 'none',
        boxShadow: glow ? '0 0 60px rgba(41, 151, 255, 0.1)' : (isHover && hover ? '0 30px 60px rgba(0, 0, 0, 0.3)' : 'none'),
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ============================================================================
// SECTIONS
// ============================================================================

function ProgressBar() {
  const progress = useScrollProgress()
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '2px', zIndex: 100, background: 'rgba(255,255,255,0.1)' }}>
      <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg, #2997ff, #af52de)', transition: 'width 0.1s linear' }} />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navItems = ['Leistungen', 'Portfolio', 'Pakete', 'Kontakt']

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(0, 0, 0, 0.72)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ textDecoration: 'none' }}><Logo /></a>
        
        <div className="nav-links" style={{ display: 'none', alignItems: 'center', gap: '2rem' }}>
          {navItems.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.875rem',
              transition: 'color 0.3s', fontWeight: 400,
            }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}>
              {item}
            </a>
          ))}
          <GlowButton href="#kontakt">Starten</GlowButton>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-btn" style={{ display: 'flex', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{ padding: '1rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(40px)' }}>
          {navItems.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.25rem', padding: '0.5rem 0' }}>
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const { ref, offset } = useParallax(0.3)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <section ref={ref} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '8rem 2rem 6rem' }}>
      {/* Mesh Gradient Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(41, 151, 255, 0.15), transparent)' }} />
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(175, 82, 222, 0.12), transparent 70%)', filter: 'blur(60px)', transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.3s ease-out' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(41, 151, 255, 0.1), transparent 70%)', filter: 'blur(60px)', transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`, transition: 'transform 0.3s ease-out' }} />
      
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '900px', transform: `translateY(${offset}px)` }}>
        <FadeIn>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '100px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '2rem' }}>
            <Sparkles size={14} style={{ color: '#2997ff' }} />
            <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 500 }}>Webdesign der nächsten Generation</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 style={{ margin: '0 0 1.5rem', lineHeight: 1.05 }}>
            <Logo size="xl" />
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.75rem', lineHeight: 1.5, fontWeight: 400 }}>
            Websites, die nicht nur gut aussehen.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#fff', marginBottom: '3rem', lineHeight: 1.5, fontWeight: 600 }}>
            Sondern <span style={{ background: 'linear-gradient(135deg, #2997ff, #af52de)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>begeistern.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <GlowButton href="#kontakt" size="lg">
              Projekt starten <ArrowRight size={18} />
            </GlowButton>
            <GlowButton href="#pakete" variant="secondary" size="lg">
              <Play size={16} fill="#fff" /> Pakete ansehen
            </GlowButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {['50+ Projekte', '100% Zufriedenheit', '24h Antwortzeit'].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', animation: 'bounce 2s infinite' }}>
        <div style={{ width: '24px', height: '40px', borderRadius: '12px', border: '2px solid rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'center', paddingTop: '8px' }}>
          <div style={{ width: '3px', height: '8px', borderRadius: '3px', background: '#2997ff', animation: 'scrollPulse 2s infinite' }} />
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { icon: Globe, title: 'Websites', desc: 'Von der Landingpage bis zur Unternehmenswebsite. Blitzschnell, SEO-optimiert, responsive.', gradient: ['#2997ff', '#0077ed'] },
    { icon: ShoppingBag, title: 'Online Shops', desc: 'E-Commerce Lösungen die verkaufen. Shopify, WooCommerce, oder Custom.', gradient: ['#af52de', '#8944ab'] },
    { icon: Smartphone, title: 'Web Apps', desc: 'Interaktive Anwendungen mit React, Next.js & Co. Perfekt auf jedem Gerät.', gradient: ['#ff6b6b', '#ee5a5a'] },
    { icon: Code, title: 'Wartung', desc: 'Updates, Hosting, Support. Wir kümmern uns um alles — du dich ums Business.', gradient: ['#34c759', '#28a745'] },
  ]

  return (
    <section id="leistungen" style={{ padding: '10rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#2997ff', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Leistungen</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Alles, was du brauchst.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 5rem' }}>
            Von der ersten Idee bis zum fertigen Produkt — wir sind dein Partner.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <Card>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: `linear-gradient(135deg, ${s.gradient[0]}, ${s.gradient[1]})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                  boxShadow: `0 8px 24px ${s.gradient[0]}33`,
                }}>
                  <s.icon size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem', lineHeight: 1.7 }}>{s.desc}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Packages() {
  const packages = [
    { name: 'Starter', price: '499', desc: 'Der perfekte Einstieg', features: ['Landingpage (1 Seite)', 'Mobile-optimiert', 'Kontaktformular', 'SEO Basics', 'SSL Zertifikat'], highlight: false },
    { name: 'Business', price: '1.299', desc: 'Für wachsende Unternehmen', features: ['Bis zu 7 Seiten', 'CMS zum Selbstbearbeiten', 'SEO Optimierung', 'Google Analytics', 'Social Media Integration', '3 Korrekturschleifen'], highlight: true },
    { name: 'Premium', price: '2.999', desc: 'Maximale Performance', features: ['Bis zu 15 Seiten', 'Individuelles Design', 'Shop-Integration möglich', 'Animations & Effekte', 'Priority Support', 'Unbegrenzte Korrekturen'], highlight: false },
  ]

  return (
    <section id="pakete" style={{ padding: '10rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(800px, 100vw)', height: '600px', background: 'radial-gradient(ellipse, rgba(41, 151, 255, 0.08), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <FadeIn>
          <p style={{ color: '#af52de', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Pakete</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Einfach. Transparent.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', maxWidth: '500px', margin: '0 auto 5rem' }}>
            Keine versteckten Kosten. Kein Kleingedrucktes.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2rem', alignItems: 'start' }}>
          {packages.map((pkg, i) => (
            <FadeIn key={i} delay={0.15 * i}>
              <div style={{ position: 'relative' }}>
                {pkg.highlight && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', zIndex: 10,
                    padding: '6px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600,
                    background: 'linear-gradient(135deg, #2997ff, #af52de)', color: '#fff',
                  }}>
                    Beliebt
                  </div>
                )}
                <Card glow={pkg.highlight} hover={!pkg.highlight} style={{ height: '100%' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>{pkg.name}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9375rem' }}>{pkg.desc}</p>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <span style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.03em' }}>€{pkg.price}</span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.5)', marginLeft: '0.5rem' }}>einmalig</span>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {pkg.features.map((f, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9375rem' }}>
                        <Check size={16} color="#2997ff" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <GlowButton href="#kontakt" variant={pkg.highlight ? 'primary' : 'secondary'}>
                    Auswählen
                  </GlowButton>
                </Card>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { num: '01', title: 'Kennenlernen', desc: 'Wir sprechen über dein Projekt, deine Ziele und Vorstellungen.' },
    { num: '02', title: 'Konzept', desc: 'Wir erstellen Design-Entwürfe. Du gibst Feedback bis es perfekt ist.' },
    { num: '03', title: 'Entwicklung', desc: 'Wir bauen deine Website. Pixel für Pixel, Zeile für Zeile.' },
    { num: '04', title: 'Launch', desc: 'Deine Website geht live. Wir feiern gemeinsam.' },
  ]

  return (
    <section id="prozess" style={{ padding: '10rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#ff6b6b', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Prozess</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, textAlign: 'center', marginBottom: '5rem', letterSpacing: '-0.03em' }}>
            So arbeiten wir.
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gap: '3rem' }}>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{
                  minWidth: '80px', height: '80px', borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 700,
                  background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.1), rgba(175, 82, 222, 0.1))',
                }}>
                  <span style={{ background: 'linear-gradient(135deg, #2997ff, #af52de)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{step.num}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.0625rem', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const projects = [
    { 
      title: 'Bella Vista', 
      category: 'Restaurant & Bistro', 
      image: '/portfolio-bistro.png',
      color: '#f5a623'
    },
    { 
      title: 'Meister Müller', 
      category: 'Handwerker & Service', 
      image: '/portfolio-handwerker.png',
      color: '#2997ff'
    },
    { 
      title: 'Power Fit', 
      category: 'Fitness & Gesundheit', 
      image: '/portfolio-fitness.png',
      color: '#34c759'
    },
  ]

  return (
    <section id="portfolio" style={{ padding: '10rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#34c759', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Portfolio</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Unsere Arbeiten.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', maxWidth: '500px', margin: '0 auto 5rem' }}>
            Ein Auszug aus unseren Projekten.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '2rem' }}>
          {projects.map((project, i) => (
            <FadeIn key={i} delay={0.15 * i}>
              <div
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: hoveredIndex === i ? 'scale(1.03) translateY(-8px)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: hoveredIndex === i ? `0 30px 60px ${project.color}33, 0 0 0 1px rgba(255,255,255,0.1)` : '0 0 0 1px rgba(255,255,255,0.08)',
                }}
              >
                {/* Image */}
                <div style={{ 
                  aspectRatio: '4/3', 
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transform: hoveredIndex === i ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} 
                  />
                </div>

                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)`,
                  opacity: hoveredIndex === i ? 1 : 0.7,
                  transition: 'opacity 0.4s ease',
                }} />

                {/* Content */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem',
                  transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <p style={{ 
                    color: project.color, 
                    fontSize: '0.8125rem', 
                    fontWeight: 600, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em',
                    marginBottom: '0.5rem',
                  }}>
                    {project.category}
                  </p>
                  <h3 style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: 700, 
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                  }}>
                    {project.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '0.9375rem',
                    opacity: hoveredIndex === i ? 1 : 0,
                    transform: hoveredIndex === i ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                  }}>
                    Projekt ansehen <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{ padding: '6rem 2rem' }}>
      <FadeIn>
        <div style={{
          maxWidth: '900px', margin: '0 auto', borderRadius: '32px', padding: 'clamp(3rem, 8vw, 5rem)',
          background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.12), rgba(175, 82, 222, 0.12))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(41, 151, 255, 0.15), transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '-50%', left: '-20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(175, 82, 222, 0.15), transparent 70%)', filter: 'blur(40px)' }} />
          
          <div style={{ position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              Bereit für deine neue Website?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.25rem', marginBottom: '2rem' }}>
              Lass uns gemeinsam etwas Großartiges bauen.
            </p>
            <GlowButton href="#kontakt" size="lg">
              Kostenloses Erstgespräch <ArrowRight size={18} />
            </GlowButton>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function Contact() {
  const inputStyle: CSSProperties = {
    width: '100%', padding: '1rem 1.25rem', borderRadius: '12px', fontSize: '1rem',
    background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.3s, background 0.3s',
  }

  return (
    <section id="kontakt" style={{ padding: '10rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#2997ff', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Kontakt</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Schreib uns.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.125rem', textAlign: 'center', marginBottom: '3rem' }}>
            Wir melden uns innerhalb von 24 Stunden.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card hover={false}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={e => { e.preventDefault(); alert('Nachricht gesendet! ✨') }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '1.25rem' }}>
                <input type="text" placeholder="Dein Name" required style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(41, 151, 255, 0.5)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)' }} />
                <input type="email" placeholder="Deine E-Mail" required style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(41, 151, 255, 0.5)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)' }} />
              </div>
              <select style={{ ...inputStyle, color: 'rgba(255, 255, 255, 0.5)' }}>
                <option value="">Welches Paket?</option>
                <option>Starter — €499</option>
                <option>Business — €1.299</option>
                <option>Premium — €2.999</option>
                <option>Individuell</option>
              </select>
              <textarea placeholder="Erzähl uns von deinem Projekt..." rows={4} required style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(41, 151, 255, 0.5)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)' }} />
              <button type="submit" style={{
                width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600,
                color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                background: '#2997ff', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0077ed'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(41, 151, 255, 0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2997ff'; e.currentTarget.style.boxShadow = 'none' }}
              >
                Nachricht senden
              </button>
            </form>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <Logo />
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
          <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>Impressum</a>
          <a href="#" style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none' }}>Datenschutz</a>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[Instagram, Linkedin, Mail].map((Icon, i) => (
            <a key={i} href="#" style={{
              width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.7)', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)' }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.8125rem', marginTop: '2rem' }}>
        © {new Date().getFullYear()} Weblity. Made with 💙 in Germany.
      </p>
    </footer>
  )
}

// ============================================================================
// APP
// ============================================================================

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; overflow-x: hidden; }
        body { 
          font-family: 'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
          background: #000; color: #fff; overflow-x: hidden; 
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: 100%;
          position: relative;
          width: 100%;
          max-width: 100vw;
        }
        #root { overflow-x: hidden; width: 100%; max-width: 100vw; }
        ::selection { background: rgba(41, 151, 255, 0.4); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.25); }
        
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        @keyframes scrollPulse { 0%, 100% { opacity: 0.5; transform: translateY(0); } 50% { opacity: 1; transform: translateY(4px); } }
        
        /* Mobile First - Base Styles */
        section { 
          padding-left: 1.25rem !important; 
          padding-right: 1.25rem !important; 
          overflow-x: hidden !important;
          max-width: 100vw !important;
        }
        
        /* Tablet and up */
        @media (min-width: 768px) {
          .nav-links { display: flex !important; }
          .menu-btn { display: none !important; }
          section { padding-left: 2rem !important; padding-right: 2rem !important; }
        }
        
        /* Mobile Adjustments */
        @media (max-width: 767px) {
          html { font-size: 15px; }
          h1, h2 { letter-spacing: -0.02em !important; }
          
          /* Better touch targets */
          button, a { min-height: 44px; }
          input, select, textarea { font-size: 16px !important; } /* Prevents iOS zoom */
          
          /* Cards full width */
          .card-grid { grid-template-columns: 1fr !important; }
        }
        
        /* Small phones */
        @media (max-width: 380px) {
          html { font-size: 14px; }
          section { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
      <div style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
        <ProgressBar />
        <Navbar />
        <Hero />
        <Services />
        <Packages />
        <Process />
        <Portfolio />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
