'use client'

export type ViewType = 'roadmap' | 'learning'

interface ViewSwitcherProps {
  currentView: ViewType
  onSwitch: (view: ViewType) => void
}

export function ViewSwitcher({ currentView, onSwitch }: ViewSwitcherProps) {
  return (
    <div className="view-switcher" role="tablist" aria-label="Переключение вида">
      <button
        role="tab"
        aria-selected={currentView === 'roadmap'}
        className={`view-switcher-button ${currentView === 'roadmap' ? 'active' : ''}`}
        onClick={() => onSwitch('roadmap')}
        title="Продуктовая дорожная карта"
      >
        📊 Roadmap
      </button>
      <button
        role="tab"
        aria-selected={currentView === 'learning'}
        className={`view-switcher-button ${currentView === 'learning' ? 'active' : ''}`}
        onClick={() => onSwitch('learning')}
        title="Дорожная карта обучения"
      >
        🎓 Learning
      </button>
    </div>
  )
}
