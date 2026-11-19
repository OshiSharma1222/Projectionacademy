import React from 'react'

// Vertical auto-scrolling column. Content is rendered twice and the track
// moves by exactly half its height, so the loop has no visible jump.
export function InfiniteSlider({ children, reverse = false, duration = 60, className = '' }) {
  const items = React.Children.toArray(children)

  return (
    <div
      className={`marquee relative h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_92%,transparent)] ${className}`}
    >
      <div
        className="marquee-track flex flex-col"
        style={{
          '--marquee-duration': `${duration}s`,
          '--marquee-direction': reverse ? 'reverse' : 'normal',
        }}
      >
        {[0, 1].map((copy) =>
          items.map((child, i) => (
            <div key={`${copy}-${i}`} className="pb-3 sm:pb-4" aria-hidden={copy === 1 || undefined}>
              {child}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
