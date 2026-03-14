import { Roadmap } from '@/components/Roadmap'
import { getRoadmapData } from '@/lib/roadmap'

export default function Page() {
  const data = getRoadmapData()

  return <Roadmap data={data} />
}