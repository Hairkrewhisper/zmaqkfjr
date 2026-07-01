import type { ChangeEvent, FormEvent } from 'react'
import { useMemo, useState } from 'react'

type FormState = {
  name: string
  phone: string
  email: string
}

const initialState: FormState = {
  name: '',
  phone: '',
  email: '',
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const isValid = useMemo(() => {
    return values.name.trim().length >= 2 && values.phone.trim().length >= 6 && /.+@.+\..+/.test(values.email)
  }, [values])

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }))
    setError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) {
      setError('Проверьте имя, телефон и email.')
      return
    }

    setSubmitted(true)
    setError('')
  }

  return (
    <div className="contact-card">
      <div className="contact-card__text">
        <div className="eyebrow">Готовы к росту вашего бизнеса?</div>
        <h2>Оставьте заявку на аудит и стратегию роста</h2>
        <p>
          Расскажите о задаче, и команда ia9.app предложит структуру, SEO-логику, CRM-связку и
          сценарий автоматизации под ваш проект.
        </p>
        <ul className="contact-card__list">
          <li>Консультация без спама</li>
          <li>Ответим в течение рабочего дня</li>
          <li>Подберём формат под вашу нишу</li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span>Имя</span>
          <input type="text" name="name" value={values.name} onChange={handleChange('name')} placeholder="Как к вам обращаться?" />
        </label>
        <label>
          <span>Телефон</span>
          <input type="tel" name="phone" value={values.phone} onChange={handleChange('phone')} placeholder="8 (800) 123-45-67" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" value={values.email} onChange={handleChange('email')} placeholder="hello@ia9.app" />
        </label>

        {error ? <p className="form-message form-message--error">{error}</p> : null}
        {submitted ? (
          <div className="form-message form-message--success" role="status">
            Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.
          </div>
        ) : null}

        <button type="submit" className="button button--primary button--full">
          Отправить заявку
        </button>
        <p className="form-note">Нажимая кнопку, вы соглашаетесь на обработку контактов для обратной связи.</p>
      </form>
    </div>
  )
}
