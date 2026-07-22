'use client'

import { useEffect, useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { Skeleton } from '@/components/motion'
import { CAL_LINK, CAL_NAMESPACE } from '@/lib/site'

const EMBED_HEIGHT = 700

/**
 * Cal.com inline booking widget. The reserved space is held at a fixed height
 * by a Skeleton overlay so nothing shifts while the calendar loads; the overlay
 * is removed once Cal reports the booking page is ready.
 */
export function CalEmbed() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let active = true
    ;(async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      cal('on', {
        action: 'linkReady',
        callback: () => {
          if (active) setLoaded(true)
        },
      })
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="relative w-full" style={{ minHeight: EMBED_HEIGHT }}>
      {!loaded && (
        <div className="absolute inset-0 z-10">
          <Skeleton height={`${EMBED_HEIGHT}px`} label="// LOADING CALENDAR" />
        </div>
      )}
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ layout: 'month_view' }}
        style={{ width: '100%', height: `${EMBED_HEIGHT}px`, overflow: 'scroll' }}
      />
    </div>
  )
}
