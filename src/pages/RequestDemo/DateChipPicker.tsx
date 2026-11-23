import { useState } from 'react'
import styles from './RequestDemo.module.css'

const WEEKDAY_FORMAT = new Intl.DateTimeFormat('en-US', { weekday: 'short' })

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function nextDays(count: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return d
  })
}

export function DateChipPicker({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const days = nextDays(6)
  const isCustom = value !== '' && !days.some((d) => toISODate(d) === value)
  const [showCustom, setShowCustom] = useState(isCustom)

  return (
    <div>
      <div className={styles.dateChips}>
        {days.map((d, i) => {
          const iso = toISODate(d)
          const selected = value === iso
          return (
            <button
              key={iso}
              type="button"
              className={styles.dateChip}
              data-selected={selected}
              onClick={() => {
                setShowCustom(false)
                onChange(iso)
              }}
            >
              <span className={styles.dateChipDay}>{i === 0 ? 'Today' : WEEKDAY_FORMAT.format(d)}</span>
              <span className={styles.dateChipNum}>{d.getDate()}</span>
            </button>
          )
        })}
      </div>

      {!showCustom ? (
        <button type="button" className={styles.dateCustomToggle} onClick={() => setShowCustom(true)}>
          Pick another date
        </button>
      ) : (
        <input
          type="date"
          className={styles.dateCustomInput}
          value={isCustom ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Custom preferred date"
        />
      )}
    </div>
  )
}
