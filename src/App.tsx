import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MockupSection } from './components/MockupSection'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { sections } from './data/sections'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('js-enabled')
  }, [])

  const scrollToId = (targetId: string) => {
    const target = document.getElementById(targetId)
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Header onNavigate={scrollToId} onAuditClick={() => scrollToId('contact')} />
      <main>
        <section id="hero" className="hero-section" aria-labelledby="hero-title">
          <div className="hero-section__inner">
            <Hero onCtaClick={() => scrollToId('contact')} />
            <div className="mockup-frame hero-section__frame">
              <img
                src={sections[0].image}
                alt={sections[0].alt}
                width={1448}
                height={1086}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
          <div className="sr-only" id="hero-title">
            <h2>{sections[0].hiddenHeading}</h2>
            <p>{sections[0].hiddenCopy}</p>
          </div>
        </section>

        {sections.slice(1).map((section, index) => (
          <MockupSection
            key={section.id}
            {...section}
            index={index + 1}
            onCtaClick={() => scrollToId('contact')}
          />
        ))}

        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div className="sr-only" id="contact-heading">
            <h2>Связаться с ia9.app</h2>
            <p>Получите аудит, консультацию и план запуска сайта, SEO и автоматизации для вашего бизнеса.</p>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer onNavigate={scrollToId} />
    </>
  )
}

export default App
