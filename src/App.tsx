import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { Menu, X, ArrowRight, Check, Star, Globe, Smartphone, ShoppingBag, Code, Mail, Instagram, Linkedin, Sparkles, Play } from 'lucide-react'

// ============================================================================
// INTRO ANIMATION
// ============================================================================

function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  // Phase 0: Dark, Phase 1: Logo glitch in, Phase 2: Burst, Phase 3: Fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),      // Start logo animation
      setTimeout(() => setPhase(2), 1200),     // Burst effect
      setTimeout(() => setPhase(3), 1800),     // Start fade out
      setTimeout(() => onComplete(), 2400),    // Complete
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: phase >= 3 ? 0 : 1,
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: phase >= 3 ? 'none' : 'auto',
    }}>
      {/* Radial burst */}
      <div style={{
        position: 'absolute',
        width: phase >= 2 ? '300vmax' : '0',
        height: phase >= 2 ? '300vmax' : '0',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(41, 151, 255, 0.3) 0%, rgba(175, 82, 222, 0.2) 30%, transparent 70%)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: phase >= 3 ? 0 : 1,
      }} />

      {/* Particles */}
      {phase >= 2 && Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: i % 2 === 0 ? '#2997ff' : '#af52de',
          animation: `particle-${i % 4} 1s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
          opacity: phase >= 3 ? 0 : 1,
          transition: 'opacity 0.3s',
        }} />
      ))}

      {/* Logo */}
      <div style={{
        position: 'relative',
        transform: phase >= 1 ? 'scale(1)' : 'scale(0.8)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        filter: phase === 1 ? 'blur(0px)' : phase === 0 ? 'blur(20px)' : 'blur(0px)',
      }}>
        {/* Glitch layers */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: phase === 1 ? 'glitch-1 0.3s ease-in-out 3' : 'none',
          opacity: 0.5,
        }}>
          <span style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontWeight: 700, fontSize: 'clamp(3rem, 15vw, 8rem)', color: '#ff0080', letterSpacing: '-0.03em' }}>
            weblity
          </span>
        </div>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: phase === 1 ? 'glitch-2 0.3s ease-in-out 3' : 'none',
          opacity: 0.5,
        }}>
          <span style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontWeight: 700, fontSize: 'clamp(3rem, 15vw, 8rem)', color: '#00ffff', letterSpacing: '-0.03em' }}>
            weblity
          </span>
        </div>
        
        {/* Main logo */}
        <span style={{ fontFamily: 'SF Pro Display, -apple-system, sans-serif', fontWeight: 700, fontSize: 'clamp(3rem, 15vw, 8rem)', letterSpacing: '-0.03em', position: 'relative' }}>
          <span style={{ color: '#fff' }}>web</span>
          <span style={{ background: 'linear-gradient(135deg, #2997ff, #af52de)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>lity</span>
        </span>
      </div>

      {/* Ring burst */}
      <div style={{
        position: 'absolute',
        width: phase >= 2 ? '200px' : '100px',
        height: phase >= 2 ? '200px' : '100px',
        borderRadius: '50%',
        border: '2px solid rgba(41, 151, 255, 0.5)',
        opacity: phase >= 2 ? 0 : phase >= 1 ? 0.5 : 0,
        transform: phase >= 2 ? 'scale(10)' : 'scale(1)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }} />
      <div style={{
        position: 'absolute',
        width: phase >= 2 ? '150px' : '80px',
        height: phase >= 2 ? '150px' : '80px',
        borderRadius: '50%',
        border: '2px solid rgba(175, 82, 222, 0.5)',
        opacity: phase >= 2 ? 0 : phase >= 1 ? 0.5 : 0,
        transform: phase >= 2 ? 'scale(15)' : 'scale(1)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
      }} />

      <style>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 3px); }
          40% { transform: translate(3px, -3px); }
          60% { transform: translate(-3px, -3px); }
          80% { transform: translate(3px, 3px); }
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(3px, -3px); }
          40% { transform: translate(-3px, 3px); }
          60% { transform: translate(3px, 3px); }
          80% { transform: translate(-3px, -3px); }
        }
        @keyframes particle-0 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-180px, -150px) scale(0); opacity: 0; }
        }
        @keyframes particle-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(200px, -120px) scale(0); opacity: 0; }
        }
        @keyframes particle-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-150px, 180px) scale(0); opacity: 0; }
        }
        @keyframes particle-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(170px, 140px) scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

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
          <GlowButton href="tel:+4917682479005">Starten</GlowButton>
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
            <GlowButton href="tel:+4917682479005" size="lg">
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

                  <GlowButton href="tel:+4917682479005" variant={pkg.highlight ? 'primary' : 'secondary'}>
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
            <GlowButton href="tel:+4917682479005" size="lg">
              Kostenloses Erstgespräch <ArrowRight size={18} />
            </GlowButton>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function Contact() {
  return (
    <section id="kontakt" style={{ padding: '8rem 2rem', overflow: 'hidden' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <p style={{ color: '#2997ff', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Kontakt</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Ruf einfach an.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1.25rem', marginBottom: '2.5rem' }}>
            Lass uns über dein Projekt sprechen — unverbindlich und kostenlos.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <a href="tel:+4917682479005" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '1.25rem 2.5rem', borderRadius: '100px',
            background: 'linear-gradient(135deg, #2997ff, #af52de)',
            color: '#fff', fontSize: '1.5rem', fontWeight: 700,
            textDecoration: 'none', fontFamily: 'SF Pro Display, sans-serif',
            boxShadow: '0 20px 50px rgba(41, 151, 255, 0.3)',
            transition: 'all 0.3s ease',
          }}>
            📞 0176 82479005
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} style={{ textDecoration: 'none' }}><Logo /></a>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('impressum'); }} style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', cursor: 'pointer' }}>Impressum</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('datenschutz'); }} style={{ color: 'rgba(255, 255, 255, 0.5)', textDecoration: 'none', cursor: 'pointer' }}>Datenschutz</a>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener" style={{
            width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.7)', transition: 'all 0.3s',
          }}>
            <Instagram size={18} />
          </a>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.8125rem', marginTop: '2rem' }}>
        © {new Date().getFullYear()} Weblity. Alle Rechte vorbehalten.
      </p>
    </footer>
  )
}

// Impressum Page
function Impressum({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '6rem 2rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: '#2997ff', fontSize: '1rem',
          cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          ← Zurück
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', fontFamily: 'SF Pro Display, sans-serif' }}>Impressum</h1>
        
        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Angaben gemäß § 5 TMG</h2>
          <p>
            Weblity<br />
            Nikk Jahn<br />
            Am Weingarten 7<br />
            35415 Pohlheim
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Kontakt</h2>
          <p>
            Telefon: 0176 82479005<br />
            E-Mail: info@weblity.de
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Nikk Jahn<br />
            Am Weingarten 7<br />
            35415 Pohlheim
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener" style={{ color: '#2997ff' }}> https://ec.europa.eu/consumers/odr/</a>.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.<br /><br />
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
            Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen 
            zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
            Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
            Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
            bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>
      </div>
    </div>
  )
}

// Datenschutz Page
function Datenschutz({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '6rem 2rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: '#2997ff', fontSize: '1rem',
          cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          ← Zurück
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem', fontFamily: 'SF Pro Display, sans-serif' }}>Datenschutzerklärung</h1>
        
        <div style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>1. Datenschutz auf einen Blick</h2>
          
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#fff' }}>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
            wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
          
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#fff' }}>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>
          
          <p style={{ marginTop: '1rem' }}>
            <strong>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.B. wenn Sie uns per Telefon kontaktieren.
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. 
            Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>2. Hosting</h2>
          <p>
            Wir hosten die Inhalte unserer Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            Details entnehmen Sie der Datenschutzerklärung von Vercel: 
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener" style={{ color: '#2997ff' }}> https://vercel.com/legal/privacy-policy</a>
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#fff' }}>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.5rem', marginBottom: '0.75rem', color: '#fff' }}>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
            Weblity<br />
            Nikk Jahn<br />
            Am Weingarten 7, 35415 Pohlheim<br /><br />
            Telefon: 0176 82479005<br />
            E-Mail: info@weblity.de
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>4. Ihre Rechte</h2>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten 
            personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. 
            Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. 
            Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </p>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>5. SSL- bzw. TLS-Verschlüsselung</h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. 
            Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt 
            und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// APP
// ============================================================================

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  const navigateTo = (page: string) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
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
        {currentPage === 'home' && (
          <>
            <ProgressBar />
            <Navbar />
            <Hero />
            <Services />
            <Packages />
            <Process />
            <Portfolio />
            <CTA />
            <Contact />
            <Footer onNavigate={navigateTo} />
          </>
        )}
        {currentPage === 'impressum' && <Impressum onBack={() => navigateTo('home')} />}
        {currentPage === 'datenschutz' && <Datenschutz onBack={() => navigateTo('home')} />}
      </div>
    </>
  )
}
