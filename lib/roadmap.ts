import { readFileSync } from 'fs'
import path from 'path'

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
  companyName: string
  title: string
  tabTitle: string;
  metaDescription: string;
  periods: RoadmapPeriod[]
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isRoadmapItem(value: unknown): value is RoadmapItem {
  return (
    isObject(value) &&
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.description === 'string'
  )
}

function isRoadmapPeriod(value: unknown): value is RoadmapPeriod {
  return (
    isObject(value) &&
    typeof value.id === 'string' &&
    typeof value.label === 'string' &&
    typeof value.timeframe === 'string' &&
    typeof value.summary === 'string' &&
    Array.isArray(value.items) &&
    value.items.every(isRoadmapItem)
  )
}

function isRoadmapData(value: unknown): value is RoadmapData {
  return (
    isObject(value) &&
    typeof value.productName === 'string' &&
    typeof value.companyName === 'string' &&
    typeof value.title === 'string' &&
    Array.isArray(value.periods) &&
    value.periods.every(isRoadmapPeriod)
  )
}

export function getRoadmapData(): RoadmapData {
  const filePath = path.join(process.cwd(), 'data', 'roadmap.json')
  const raw = readFileSync(filePath, 'utf-8')
  const parsed: unknown = JSON.parse(raw)

  if (!isRoadmapData(parsed)) {
    throw new Error('Invalid roadmap.json structure')
  }

  return parsed
}
