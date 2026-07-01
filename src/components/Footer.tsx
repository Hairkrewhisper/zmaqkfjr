const footerLinks = [
  { label: 'Услуги', targetId: 'landing' },
  { label: 'Кейсы', targetId: 'corporate' },
  { label: 'Результаты', targetId: 'results' },
  { label: 'Контакты', targetId: 'contact' },
]

type FooterProps = {
  onNavigate: (targetId: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__wave" aria-hidden="true" />
      <div className="site-footer__inner">
        <div>
          <div className="brand brand--footer">
            <span className="brand__iq">iQ</span>
            <span className="brand__ia9">ia9</span>
            <span className="brand__app">.app</span>
          </div>
          <p>Premium web-agency для сайтов, SEO, CRM и AI-автоматизации.</p>
        </div>

        <div className="site-footer__contacts">
          <a href="tel:+78001234567">8 (800) 123-45-67</a>
          <a href="mailto:hello@ia9.app">hello@ia9.app</a>
          <span>Онлайн-чат 24/7</span>
        </div>

        <nav className="site-footer__nav" aria-label="Навигация в подвале">
          {footerLinks.map((item) => (
            <button key={item.targetId} type="button" onClick={() => onNavigate(item.targetId)}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} ia9.app</span>
        <span>Создаём сайты, которые приводят клиентов</span>
      </div>
    </footer>
  )
}
