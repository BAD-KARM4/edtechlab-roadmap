'use client'

import { useState, useMemo } from 'react'
import { basePath } from '@/lib/config'
import type { LearningPathData, LearningPathNode, LearningPathEdge } from '@/lib/i18n'

interface LearningPathProps {
  data: LearningPathData
  locale: string
}

const NODE_WIDTH = 200
const NODE_HEIGHT = 70

const trackColors = {
  common: { stroke: '#666666', fill: 'rgba(102, 102, 102, 0.1)' },
  red: { stroke: '#ff3b2f', fill: 'rgba(255, 59, 47, 0.1)' },
  blue: { stroke: '#0066ff', fill: 'rgba(0, 102, 255, 0.1)' },
  green: { stroke: '#00cc66', fill: 'rgba(0, 204, 102, 0.1)' },
}

export function LearningPath({ data, locale }: LearningPathProps) {
  const [selectedNode, setSelectedNode] = useState<LearningPathNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Вычисляем размеры SVG
  const svgWidth = useMemo(() => {
    const maxX = Math.max(...data.nodes.map(n => n.x))
    return maxX + NODE_WIDTH + 100
  }, [data.nodes])

  const svgHeight = useMemo(() => {
    const maxY = Math.max(...data.nodes.map(n => n.y))
    return maxY + NODE_HEIGHT + 100
  }, [data.nodes])

  // Получаем путь для стрелки
  const getEdgePath = (fromNode: LearningPathNode, toNode: LearningPathNode) => {
    const startX = fromNode.x + NODE_WIDTH / 2
    const startY = fromNode.y + NODE_HEIGHT / 2
    const endX = toNode.x + NODE_WIDTH / 2
    const endY = toNode.y + NODE_HEIGHT / 2

    // Простая прямая линия
    return `M ${startX} ${startY} L ${endX} ${endY}`
  }

  // Определяем, активен ли узел (все узлы активны по умолчанию)
  const isNodeActive = (nodeId: string) => true

  return (
    <section className="learning-path-section" aria-label={data.title}>
      <h2 className="learning-path-section-title">{data.title}</h2>
      <p className="learning-path-section-description">{data.description}</p>

      {/* Legend */}
      <div className="learning-path-legend">
        <div className="learning-path-legend-item">
          <span className="learning-path-legend-color common" />
          <span>Общий курс</span>
        </div>
        <div className="learning-path-legend-item">
          <span className="learning-path-legend-color red" />
          <span>Red Team</span>
        </div>
        <div className="learning-path-legend-item">
          <span className="learning-path-legend-color blue" />
          <span>Blue Team</span>
        </div>
        <div className="learning-path-legend-item">
          <span className="learning-path-legend-color green" />
          <span>Green Team</span>
        </div>
      </div>

      <div className="learning-path-container">
      <div className="learning-path-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="learning-path-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Определяем маркер для стрелок */}
          <defs>
            <marker
              id="arrowhead-red"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#ff3b2f" />
            </marker>
            <marker
              id="arrowhead-blue"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#0066ff" />
            </marker>
            <marker
              id="arrowhead-green"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#00cc66" />
            </marker>
            <marker
              id="arrowhead-common"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#666666" />
            </marker>
          </defs>

          {/* Слой со стрелками */}
          <g className="learning-path-edges">
            {data.edges.map((edge, index) => {
              const fromNode = data.nodes.find(n => n.id === edge.from)
              const toNode = data.nodes.find(n => n.id === edge.to)
              if (!fromNode || !toNode) return null

              const pathColor = trackColors[toNode.track].stroke
              const isActive = hoveredNode === edge.from || hoveredNode === edge.to

              return (
                <path
                  key={index}
                  d={getEdgePath(fromNode, toNode)}
                  stroke={pathColor}
                  strokeWidth={isActive ? 3 : 2}
                  fill="none"
                  markerEnd={`url(#arrowhead-${toNode.track})`}
                  className={`learning-path-edge ${isActive ? 'active' : ''}`}
                  opacity={isActive ? 1 : 0.4}
                />
              )
            })}
          </g>

          {/* Слой с узлами */}
          <g className="learning-path-nodes">
            {data.nodes.map((node) => {
              const isActive = isNodeActive(node.id)
              const isHovered = hoveredNode === node.id
              const colors = trackColors[node.track]

              return (
                <g
                  key={node.id}
                  className={`learning-path-node ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
                  onClick={() => setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                  tabIndex={0}
                  role="button"
                  aria-label={node.name}
                >
                  {/* Фон узла */}
                  <rect
                    x={node.x}
                    y={node.y}
                    width={NODE_WIDTH}
                    height={NODE_HEIGHT}
                    rx="8"
                    ry="8"
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={isHovered ? 3 : 2}
                    className="learning-path-node-bg"
                  />

                  {/* Текст узла */}
                  <text
                    x={node.x + NODE_WIDTH / 2}
                    y={node.y + NODE_HEIGHT / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="learning-path-node-text"
                    fill="#ffffff"
                    fontSize="13"
                    fontWeight="500"
                  >
                    {/* Разбиваем длинный текст на строки */}
                    {node.name.length > 35
                      ? node.name.split(' ').reduce((lines: string[], word: string, i: number) => {
                          const lastLine = lines[lines.length - 1] || ''
                          if (lastLine.length + word.length < 30) {
                            lines[lines.length - 1] = lastLine + (lastLine ? ' ' : '') + word
                          } else {
                            lines.push(word)
                          }
                          return lines
                        }, []).slice(0, 3).map((line: string, i: number, arr: string[]) => (
                          <tspan
                            key={i}
                            x={node.x + NODE_WIDTH / 2}
                            dy={i === 0 ? 0 : 16}
                            fill="#ffffff"
                          >
                            {line}
                            {i < arr.length - 1 && arr.length > 3 && i === arr.length - 2 && '...'}
                          </tspan>
                        ))
                      : node.name
                    }
                  </text>
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      {/* Модальное окно с деталями курса */}
      {selectedNode && (
        <div
          className="learning-path-modal-overlay"
          onClick={() => setSelectedNode(null)}
        >
          <div
            className="learning-path-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="learning-path-modal-close"
              onClick={() => setSelectedNode(null)}
              aria-label="Закрыть"
            >
              ×
            </button>

            <div
              className="learning-path-modal-track"
              style={{ color: trackColors[selectedNode.track].stroke }}
            >
              {selectedNode.track === 'common' && 'Общий курс'}
              {selectedNode.track === 'red' && 'Red Team'}
              {selectedNode.track === 'blue' && 'Blue Team'}
              {selectedNode.track === 'green' && 'Green Team'}
            </div>

            <h3 className="learning-path-modal-title">
              {selectedNode.name}
            </h3>

            <p className="learning-path-modal-description">
              {selectedNode.description}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
