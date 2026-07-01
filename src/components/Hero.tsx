type HeroProps = {
  onCtaClick: () => void
}

export function Hero({ onCtaClick }: HeroProps) {
  return (
    <div className="hero-copy">
      <div className="eyebrow">ia9.app · premium web-agency</div>
      <h1>
        Создаём сайты, <span>которые приводят клиентов</span>
      </h1>
      <p>
        Лендинги, корпоративные сайты, интернет-магазины, SEO, CRM и AI-агенты — всё, что нужно,
        чтобы ваш digital-маркетинг работал как система.
      </p>
      <div className="hero-copy__actions">
        <button type="button" className="button button--primary" onClick={onCtaClick}>
          Оставить заявку
        </button>
        <a className="button button--secondary" href="tel:+78001234567">
          8 (800) 123-45-67
        </a>
      </div>
      <div className="hero-copy__meta">
        <span>Онлайн-чат 24/7</span>
        <span>hello@ia9.app</span>
        <span>SEO оптимизация</span>
      </div>
    </div>
  )
}
