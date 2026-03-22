import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { Menu, X, ArrowRight, Check, Globe, Smartphone, ShoppingBag, Code, Phone } from 'lucide-react'

// ============================================================================
// ANIMATED BACKGROUND
// ============================================================================

function AnimatedBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Base gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #0a1a2e 100%)',
      }} />
      
      {/* Animated gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '60%',
        height: '60%',
        background: 'radial-gradient(circle, rgba(41, 151, 255, 0.15) 0%, transparent 70%)',
        animation: 'float1 20s ease-in-out infinite',
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-20%',
        width: '70%',
        height: '70%',
        background: 'radial-gradient(circle, rgba(175, 82, 222, 0.15) 0%, transparent 70%)',
        animation: 'float2 25s ease-in-out infinite',
        filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '20%',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(0, 212, 170, 0.1) 0%, transparent 70%)',
        animation: 'float3 22s ease-in-out infinite',
        filter: 'blur(70px)',
      }} />
      
      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />
      
      {/* Noise texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 10%) scale(1.1); }
          66% { transform: translate(-5%, 5%) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-8%, -5%) scale(1.05); }
          66% { transform: translate(5%, 10%) scale(1.1); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, -8%) scale(1.1); }
          66% { transform: translate(-5%, 5%) scale(0.9); }
        }
      `}</style>
    </div>
  )
}

// ============================================================================
// GLASSMORPHISM CARD
// ============================================================================

function GlassCard({ children, style, hover = true }: { children: ReactNode; style?: CSSProperties; hover?: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2rem',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hover && isHovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover && isHovered 
          ? '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 10px 30px rgba(0, 0, 0, 0.2)',
        ...style
      }}
    >
      {children}
    </div>
  )
}

// ============================================================================
// ANIMATED BUTTON
// ============================================================================

function GlowButton({ children, href, size = 'md' }: { children: ReactNode; href: string; size?: 'md' | 'lg' }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const padding = size === 'lg' ? '1.25rem 2.5rem' : '0.875rem 1.75rem'
  const fontSize = size === 'lg' ? '1.125rem' : '1rem'
  
  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding,
        fontSize,
        fontWeight: 600,
        color: '#fff',
        background: 'linear-gradient(135deg, #2997ff 0%, #af52de 100%)',
        borderRadius: '100px',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(41, 151, 255, 0.4), 0 0 60px rgba(175, 82, 222, 0.3)'
          : '0 10px 30px rgba(41, 151, 255, 0.3)',
      }}
    >
      {children}
    </a>
  )
}

// ============================================================================
// FADE IN ANIMATION
// ============================================================================

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ============================================================================
// LOGO
// ============================================================================

function Logo() {
  return (
    <span style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontWeight: 800, fontSize: '1.75rem', letterSpacing: '-0.03em' }}>
      <span style={{ color: '#fff' }}>web</span>
      <span style={{ background: 'linear-gradient(135deg, #2997ff, #af52de)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>lity</span>
    </span>
  )
}

// ============================================================================
// NAVBAR
// ============================================================================

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 2rem',
      background: scrolled ? 'rgba(10, 10, 26, 0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo />
        <div className="nav-links" style={{ display: 'none', gap: '2.5rem', alignItems: 'center' }}>
          {['Leistungen', 'Pakete', 'Prozess', 'Portfolio'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 500, transition: 'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            >{item}</a>
          ))}
          <GlowButton href="tel:+4917682479005">Anrufen</GlowButton>
        </div>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'block', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10, 10, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
          {['Leistungen', 'Pakete', 'Prozess', 'Portfolio'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 600 }}>{item}</a>
          ))}
          <GlowButton href="tel:+4917682479005">📞 Jetzt anrufen</GlowButton>
        </div>
      )}
    </nav>
  )
}

// ============================================================================
// HERO
// ============================================================================

function Hero() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '900px', textAlign: 'center' }}>
        <FadeIn>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(41, 151, 255, 0.1)',
            border: '1px solid rgba(41, 151, 255, 0.2)',
            borderRadius: '100px',
            marginBottom: '2rem',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4aa', animation: 'pulse 2s infinite' }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem', fontWeight: 500 }}>Verfügbar für neue Projekte</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
          }}>
            Websites die{' '}
            <span style={{
              background: 'linear-gradient(135deg, #2997ff 0%, #af52de 50%, #00d4aa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'gradient 5s ease infinite',
            }}>
              begeistern
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
            color: 'rgba(255, 255, 255, 0.6)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.6,
          }}>
            Wir gestalten moderne, schnelle und einzigartige Websites, die dein Business auf das nächste Level bringen.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <GlowButton href="tel:+4917682479005" size="lg">
              <Phone size={20} /> Kostenlos beraten lassen
            </GlowButton>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { num: '50+', label: 'Projekte' },
              { num: '100%', label: 'Zufriedenheit' },
              { num: '48h', label: 'Antwortzeit' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(135deg, #2997ff, #af52de)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.num}</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
      
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}</style>
    </section>
  )
}

// ============================================================================
// SERVICES
// ============================================================================

function Services() {
  const services = [
    { icon: Globe, title: 'Webdesign', desc: 'Einzigartige Designs, die deine Marke perfekt widerspiegeln und Besucher begeistern.', color: '#2997ff' },
    { icon: Smartphone, title: 'Responsive', desc: 'Perfekt auf jedem Gerät — vom Smartphone bis zum Desktop-Monitor.', color: '#af52de' },
    { icon: ShoppingBag, title: 'E-Commerce', desc: 'Online-Shops die verkaufen. Moderne Lösungen für deinen digitalen Erfolg.', color: '#00d4aa' },
    { icon: Code, title: 'Entwicklung', desc: 'Sauberer Code, schnelle Ladezeiten und beste Performance.', color: '#ff9500' },
  ]

  return (
    <section id="leistungen" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#2997ff', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Leistungen</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Was wir für dich tun
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.125rem' }}>
            Alles aus einer Hand — von der Idee bis zur fertigen Website.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <GlassCard>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                  border: `1px solid ${service.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}>
                  <service.icon size={28} color={service.color} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>{service.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.6 }}>{service.desc}</p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PACKAGES
// ============================================================================

function Packages() {
  const packages = [
    {
      name: 'Starter',
      price: '499',
      desc: 'Perfekt für den Einstieg',
      features: ['One-Pager Website', 'Responsive Design', 'Kontaktformular', 'SEO Grundlagen', 'SSL Zertifikat'],
      color: '#2997ff',
    },
    {
      name: 'Business',
      price: '1.299',
      desc: 'Für wachsende Unternehmen',
      features: ['Bis zu 5 Seiten', 'Content Management', 'Blog Integration', 'Google Analytics', 'E-Mail Support'],
      highlight: true,
      color: '#af52de',
    },
    {
      name: 'Premium',
      price: '2.999',
      desc: 'Maximaler Impact',
      features: ['Bis zu 10 Seiten', 'E-Commerce Ready', 'Buchungssystem', 'Priority Support', 'Individuelle Animationen'],
      color: '#00d4aa',
    },
  ]

  return (
    <section id="pakete" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#af52de', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Pakete</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Transparent & fair
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem', fontSize: '1.125rem' }}>
            Keine versteckten Kosten. Wähle das Paket, das zu dir passt.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
          {packages.map((pkg, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <GlassCard style={{
                border: pkg.highlight ? `2px solid ${pkg.color}` : undefined,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {pkg.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: `linear-gradient(135deg, ${pkg.color}, #2997ff)`,
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.375rem 0.75rem',
                    borderRadius: '100px',
                  }}>
                    BELIEBT
                  </div>
                )}
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{pkg.name}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '1.5rem' }}>{pkg.desc}</p>
                <div style={{ marginBottom: '2rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, background: `linear-gradient(135deg, ${pkg.color}, #fff)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>€{pkg.price}</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.5)', marginLeft: '0.5rem' }}>einmalig</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                  {pkg.features.map((feature, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                      <Check size={18} color={pkg.color} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="tel:+4917682479005" style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '1rem',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  background: pkg.highlight ? `linear-gradient(135deg, ${pkg.color}, #2997ff)` : 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  border: pkg.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s',
                }}>
                  Jetzt starten
                </a>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PROCESS
// ============================================================================

function Process() {
  const steps = [
    { num: '01', title: 'Gespräch', desc: 'Wir lernen dich und dein Business kennen.' },
    { num: '02', title: 'Konzept', desc: 'Wir erstellen ein maßgeschneidertes Design.' },
    { num: '03', title: 'Umsetzung', desc: 'Deine Website wird Pixel für Pixel gebaut.' },
    { num: '04', title: 'Launch', desc: 'Deine Website geht live — wir feiern!' },
  ]

  return (
    <section id="prozess" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#00d4aa', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Prozess</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
            So arbeiten wir
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gap: '2rem' }}>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'center',
                padding: '2rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}>
                <div style={{
                  minWidth: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, rgba(41, 151, 255, 0.1), rgba(175, 82, 222, 0.1))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#2997ff',
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PORTFOLIO
// ============================================================================

function Portfolio() {
  const projects = [
    { title: 'Bistro Milano', category: 'Restaurant', image: '/portfolio-bistro.png', color: '#ff6b6b' },
    { title: 'Müller Handwerk', category: 'Handwerker', image: '/portfolio-handwerker.png', color: '#ffd93d' },
    { title: 'FitLife Studio', category: 'Fitness', image: '/portfolio-fitness.png', color: '#6bcb77' },
  ]

  return (
    <section id="portfolio" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <FadeIn>
          <p style={{ color: '#ff9500', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', textAlign: 'center' }}>Portfolio</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
            Unsere Projekte
          </h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2rem' }}>
          {projects.map((project, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <div style={{
                  aspectRatio: '16/10',
                  background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ color: project.color, fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.category}</p>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{project.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CTA
// ============================================================================

function CTA() {
  return (
    <section style={{ padding: '6rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <FadeIn>
          <GlassCard style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.1), rgba(175, 82, 222, 0.1))',
            border: '1px solid rgba(41, 151, 255, 0.2)',
          }} hover={false}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
              Bereit für deine neue Website?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              Lass uns in einem kurzen Gespräch herausfinden, wie wir dir helfen können.
            </p>
            <GlowButton href="tel:+4917682479005" size="lg">
              <Phone size={20} /> 0176 82479005
            </GlowButton>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: '3rem 2rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); window.scrollTo(0, 0); }} style={{ textDecoration: 'none' }}><Logo /></a>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('impressum'); }} style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', cursor: 'pointer' }}>Impressum</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('datenschutz'); }} style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', cursor: 'pointer' }}>Datenschutz</a>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.8125rem', marginTop: '2rem' }}>
        © {new Date().getFullYear()} Weblity. Alle Rechte vorbehalten.
      </p>
    </footer>
  )
}

// ============================================================================
// LEGAL PAGES
// ============================================================================

function Impressum({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ minHeight: '100vh', padding: '6rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#2997ff', fontSize: '1rem', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>← Zurück</button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Impressum</h1>
        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Angaben gemäß § 5 TMG</h2>
          <p>Weblity<br />Nikk Jahn<br />Am Weingarten 7<br />35415 Pohlheim</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Kontakt</h2>
          <p>Telefon: 0176 82479005<br />E-Mail: info@weblity.de</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Verantwortlich für den Inhalt</h2>
          <p>Nikk Jahn<br />Am Weingarten 7<br />35415 Pohlheim</p>
        </div>
      </div>
    </div>
  )
}

function Datenschutz({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ minHeight: '100vh', padding: '6rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#2997ff', fontSize: '1rem', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>← Zurück</button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>Datenschutzerklärung</h1>
        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>1. Datenschutz auf einen Blick</h2>
          <p>Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>2. Hosting</h2>
          <p>Wir hosten die Inhalte unserer Website bei Vercel Inc.</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>3. Verantwortliche Stelle</h2>
          <p>Weblity<br />Nikk Jahn<br />Am Weingarten 7<br />35415 Pohlheim<br /><br />Telefon: 0176 82479005<br />E-Mail: info@weblity.de</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>4. SSL-Verschlüsselung</h2>
          <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung.</p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// APP
// ============================================================================

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigateTo = (page: string) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { 
          font-family: 'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
          background: #0a0a1a; 
          color: #fff; 
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        ::selection { background: rgba(41, 151, 255, 0.4); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a1a; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.15); border-radius: 4px; }
        
        @media (min-width: 768px) {
          .nav-links { display: flex !important; }
          .menu-btn { display: none !important; }
        }
        
        @media (max-width: 767px) {
          html { font-size: 15px; }
        }
      `}</style>
      
      <AnimatedBackground />
      
      {currentPage === 'home' && (
        <>
          <Navbar />
          <Hero />
          <Services />
          <Packages />
          <Process />
          <Portfolio />
          <CTA />
          <Footer onNavigate={navigateTo} />
        </>
      )}
      {currentPage === 'impressum' && <Impressum onBack={() => navigateTo('home')} />}
      {currentPage === 'datenschutz' && <Datenschutz onBack={() => navigateTo('home')} />}
    </>
  )
}
