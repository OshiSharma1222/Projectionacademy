import { Star } from 'lucide-react'
import React from 'react'

const items = [
  'JEE Main',
  'Class 11–12 Science',
  'Class 9–10 CBSE Foundation',
  'Weekly tests',
  'One-on-one mentorship',
  '200+ selections',
  'Yamuna Vihar, Delhi',
]

// Slow horizontal strip of what the academy offers.
const Ticker = () => (
  <div className="ticker overflow-hidden border-y border-brand-800 bg-brand-700 py-3.5 text-white sm:py-4">
    <div className="ticker-track flex w-max">
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
          {items.map((item) => (
            <li key={item} className="flex items-center whitespace-nowrap px-5 text-sm font-semibold tracking-wide sm:px-8 sm:text-base">
              <Star className="mr-5 h-3.5 w-3.5 fill-accent text-accent sm:mr-8" />
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
)

export default Ticker
