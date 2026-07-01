import { useEffect, useState } from 'react'

type HeaderProps = {
  onNavigate: (targetId: string) => void
  onAuditClick: () => void
}

const navItems = [
  { label: 'Услуги', targetId: 'landing' },
  { label: 'Кейсы', targetId: 'corporate' },
  { label: 'Результаты', targetId: 'results' },
  { label: 'Контакты', targetId: 'contact' },
]

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="brand brand--button" onClick={onClick} aria-label="ia9.app">
      <span className="brand__iq">iQ</span>
      <span className="brand__ia9">ia9</span>
      <span className="brand__app">.app</span>
    </button>
  )
}

export function Header({ onNavigate, onAuditClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleNavigate = (targetId: string) => {
    onNavigate(targetId)
    setMenuOpen(false)
  }

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <Logo onClick={() => onNavigate('hero')} />

        <nav className="site-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <button key={item.targetId} type="button" className="site-nav__link" onClick={() => handleNavigate(item.targetId)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="site-header__actions">
          <button type="button" className="button button--ghost" onClick={onAuditClick}>
            Получить аудит
          </button>
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? 'menu-toggle--open' : ''}`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Меню</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__panel">
          {navItems.map((item) => (
            <button key={item.targetId} type="button" className="mobile-menu__link" onClick={() => handleNavigate(item.targetId)}>
              {item.label}
            </button>
          ))}
          <button type="button" className="button button--primary mobile-menu__cta" onClick={() => handleNavigate('contact')}>
            Получить аудит
          </button>
        </div>
      </div>
    </header>
  )
}
