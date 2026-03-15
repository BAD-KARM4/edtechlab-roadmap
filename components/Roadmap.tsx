'use client'

import { useEffect, useMemo, useState, useCallback } from 'react'
import type { RoadmapData, RoadmapItem, RoadmapPeriod } from '@/lib/roadmap'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { basePath } from '@/lib/config'

function getValidPeriod(periods: RoadmapPeriod[], periodId: string) {
  return periods.find((period) => period.id === periodId) ?? periods[0]
}

function getValidItem(items: RoadmapItem[], itemId: string) {
  return items.find((item) => item.id === itemId) ?? items[0]
}

interface RoadmapProps {
  data: RoadmapData
}

export function Roadmap({ data }: RoadmapProps) {
  const assetBase = basePath
  const [activePeriodId, setActivePeriodId] = useState(data.periods[0]?.id ?? '')
  const [activeItemId, setActiveItemId] = useState(data.periods[0]?.items[0]?.id ?? '')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const initialPeriod = getValidPeriod(data.periods, hash)
    setActivePeriodId(initialPeriod.id)
    setActiveItemId(initialPeriod.items[0]?.id ?? '')
  }, [data.periods])

  const activePeriod = useMemo(
    () => getValidPeriod(data.periods, activePeriodId),
    [activePeriodId, data.periods]
  )

  useEffect(() => {
    if (!activePeriod.items.length) return
    const validItem = getValidItem(activePeriod.items, activeItemId)
    if (validItem.id !== activeItemId) {
      setActiveItemId(validItem.id)
    }
  }, [activeItemId, activePeriod])

  useEffect(() => {
    if (!activePeriodId) return
    const nextHash = `#${activePeriodId}`
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash)
    }
  }, [activePeriodId])

  const activeItem = useMemo(
    () => getValidItem(activePeriod.items, activeItemId),
    [activeItemId, activePeriod]
  )

  // 🔹 Клавиатурная навигация по таймлайну (периоды)
  const handlePeriodKeyDown = useCallback(
    (e: React.KeyboardEvent, currentPeriodId: string) => {
      const periodIds = data.periods.map((p) => p.id)
      const currentIndex = periodIds.indexOf(currentPeriodId)

      let nextIndex = currentIndex

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          nextIndex = (currentIndex + 1) % periodIds.length
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          nextIndex = (currentIndex - 1 + periodIds.length) % periodIds.length
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = periodIds.length - 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          return
        default:
          return
      }

      const nextPeriodId = periodIds[nextIndex]
      setActivePeriodId(nextPeriodId)
      setActiveItemId(activePeriod.items[0]?.id ?? '')

      // Фокус на новый таб
      const nextTab = document.getElementById(`tab-${nextPeriodId}`)
      nextTab?.focus()
    },
    [data.periods, activePeriod.items]
  )

  // 🔹 Клавиатурная навигация по списку фич
  const handleFeatureKeyDown = useCallback(
    (e: React.KeyboardEvent, currentItemId: string) => {
      const itemIds = activePeriod.items.map((i) => i.id)
      const currentIndex = itemIds.indexOf(currentItemId)

      let nextIndex = currentIndex

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          nextIndex = Math.min(currentIndex + 1, itemIds.length - 1)
          break
        case 'ArrowUp':
          e.preventDefault()
          nextIndex = Math.max(currentIndex - 1, 0)
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = itemIds.length - 1
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          return
        default:
          return
      }

      const nextItemId = itemIds[nextIndex]
      setActiveItemId(nextItemId)

      // Фокус на новый элемент
      const nextFeature = document.getElementById(`feature-${nextItemId}`)
      nextFeature?.focus()
    },
    [activePeriod.items]
  )

  return (
    <main className="page-shell" id="main-content">
      <div className="page-noise" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-a" aria-hidden="true" />
      <div className="bg-red-glow bg-red-glow-b" aria-hidden="true" />

      <header className="site-header container" role="banner">
        <div className="site-header-bar">
          <a href="#main-content" className="brand-block" aria-label="PT EdTechLab">
            <img
              src={`${assetBase}/pt-edtechlab-logo.png`}
              alt="PT EdTechLab"
              className="brand-logo-image"
            />
            <div className="brand-copy">
              <div className="brand-name">{data.productName}</div>
              <div className="brand-subtitle">{data.companyName}</div>
            </div>
          </a>
          <LocaleSwitcher />
        </div>
      </header>

      <section id="top" className="hero container">
        <h1 className="hero-title">{data.title}</h1>
      </section>

      <section id="roadmap" className="roadmap-section container" aria-label="Дорожная карта продукта">
        <div className="roadmap-timeline-wrap">
          <div className="roadmap-timeline-line" aria-hidden="true" />

          <div
            className="roadmap-timeline"
            role="tablist"
            aria-label="Периоды дорожной карты"
            style={{ gridTemplateColumns: `repeat(${data.periods.length}, minmax(0, 1fr))` }}
          >
            {data.periods.map((period) => {
              const isActive = period.id === activePeriodId

              return (
                <button
                  key={period.id}
                  type="button"
                  role="tab"
                  id={`tab-${period.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${period.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`roadmap-period ${isActive ? 'roadmap-period-active' : ''}`}
                  onClick={() => {
                    setActivePeriodId(period.id)
                    setActiveItemId(period.items[0]?.id ?? '')
                  }}
                  onKeyDown={(e) => handlePeriodKeyDown(e, period.id)}
                >
                  <span className="roadmap-period-label">{period.label}</span>
                  <span className="roadmap-period-dot" aria-hidden="true">
                    <span className="roadmap-period-dot-inner" />
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="roadmap-body">
          <div className="roadmap-list-column">
            <ul
              className="roadmap-feature-list"
              role="list"
              aria-label={`Функционал периода ${activePeriod.label}`}
            >
              {activePeriod.items.map((item) => {
                const isActive = item.id === activeItemId

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      id={`feature-${item.id}`}
                      role="listitem"
                      aria-pressed={isActive}
                      className={`roadmap-feature-item ${isActive ? 'roadmap-feature-item-active' : ''}`}
                      onClick={() => setActiveItemId(item.id)}
                      onKeyDown={(e) => handleFeatureKeyDown(e, item.id)}
                    >
                      <span className="roadmap-feature-bullet" aria-hidden="true" />
                      <span className="roadmap-feature-text">{item.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <aside
            className="roadmap-info-column"
            role="region"
            aria-labelledby={`panel-${activePeriod.id}-title`}
          >
            <div
              className="roadmap-info-card"
              id={`panel-${activePeriod.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activePeriod.id}`}
            >
              <div className="roadmap-info-grid" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="roadmap-info-topline">
                <span className="roadmap-info-period">{activePeriod.label}</span>
                <span className="roadmap-info-timeframe">{activePeriod.timeframe}</span>
              </div>

              <h2
                className="roadmap-info-title"
                id={`panel-${activePeriod.id}-title`}
              >
                {activeItem.name}
              </h2>
              <p className="roadmap-info-description">{activeItem.description}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}