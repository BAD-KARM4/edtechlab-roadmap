export interface RoadmapItem {
  id: string
  name: string
  description: string
}

export interface RoadmapPeriod {
  id: string
  label: string
  timeframe: string
  summary: string
  items: RoadmapItem[]
}

export interface RoadmapData {
  productName: string
  title: string
  tabTitle: string
  metaDescription: string
  periods: RoadmapPeriod[]
}
