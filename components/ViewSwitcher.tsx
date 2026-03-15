'use client'

export type ViewType = 'roadmap' | 'learning'

interface ViewSwitcherProps {
  currentView: ViewType
  onSwitch: (view: ViewType) => void
}

function RoadmapIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}

function LearningIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

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
        <RoadmapIcon />
        <span>Roadmap</span>
      </button>
      <button
        role="tab"
        aria-selected={currentView === 'learning'}
        className={`view-switcher-button ${currentView === 'learning' ? 'active' : ''}`}
        onClick={() => onSwitch('learning')}
        title="Дорожная карта обучения"
      >
        <LearningIcon />
        <span>Learning</span>
      </button>
    </div>
  )
}
