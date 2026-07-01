import { useEffect, useRef, useState } from 'react'

type MockupSectionProps = {
  id: string
  image: string
  alt: string
  hiddenHeading: string
  hiddenCopy: string
  ctaLabel?: string
  onCtaClick: () => void
  index: number
}

export function MockupSection({
  id,
  image,
  alt,
  hiddenHeading,
  hiddenCopy,
  ctaLabel,
  onCtaClick,
  index,
}: MockupSectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.24 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id={id} className={`mockup-section ${isVisible ? 'is-visible' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="mockup-section__inner">
        <div className="mockup-frame">
          <img
            src={image}
            alt={alt}
            width={1448}
            height={1086}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>

        <div className="sr-only">
          <h2 id={`${id}-title`}>{hiddenHeading}</h2>
          <p>{hiddenCopy}</p>
        </div>

        {ctaLabel ? (
          <div className="mockup-section__cta">
            <button type="button" className="button button--primary" onClick={onCtaClick}>
              {ctaLabel}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
