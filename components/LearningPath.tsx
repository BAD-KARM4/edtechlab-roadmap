'use client'

import { useState, useMemo } from 'react'
import type { LearningPathData, LearningPathNode } from '@/lib/i18n'

interface LearningPathProps {
  data: LearningPathData
  locale: string
}

const NODE_WIDTH = 240
const NODE_HEIGHT = 100
const NODE_PADDING = 16

const trackColors = {
  common: { stroke: '#666666', fill: 'rgba(102, 102, 102, 0.1)' },
  red: { stroke: '#ff3b2f', fill: 'rgba(255, 59, 47, 0.1)' },
  blue: { stroke: '#0066ff', fill: 'rgba(0, 102, 255, 0.1)' },
  green: { stroke: '#00cc66', fill: 'rgba(0, 204, 102, 0.1)' },
  purple: { stroke: '#9b51e0', fill: 'rgba(155, 81, 224, 0.15)' },
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
    return maxY + NODE_HEIGHT + 250
  }, [data.nodes])

  // Получаем точку на границе прямоугольника
  const getEdgePoints = (
    fromNode: LearningPathNode,
    toNode: LearningPathNode,
    edge: LearningPathEdge
  ) => {
    const fromCenterX = fromNode.x + NODE_WIDTH / 2
    const fromCenterY = fromNode.y + NODE_HEIGHT / 2
    const toCenterX = toNode.x + NODE_WIDTH / 2
    const toCenterY = toNode.y + NODE_HEIGHT / 2

    // Определяем, какое соединение преобладает
    const dx = toCenterX - fromCenterX
    const dy = toCenterY - fromCenterY
    
    let startX, startY, endX, endY
    
    // Специальные случаи: стрелки в sast и cs должны входить слева
    const enterFromLeft = edge.to === 'sast' || edge.to === 'cs'
    
    if (enterFromLeft) {
      // Входим в левую границу
      startX = fromNode.x + NODE_WIDTH
      startY = fromCenterY
      endX = toNode.x
      endY = toCenterY
    }
    // Если горизонтальное преобладает
    else if (Math.abs(dx) > Math.abs(dy)) {
      // Стрелка идёт слева направо или справа налево
      if (dx > 0) {
        // Вправо: выходим из правой границы, входим в левую
        startX = fromNode.x + NODE_WIDTH
        startY = fromCenterY
        endX = toNode.x
        endY = toCenterY
      } else {
        // Влево: выходим из левой границы, входим в правую
        startX = fromNode.x
        startY = fromCenterY
        endX = toNode.x + NODE_WIDTH
        endY = toCenterY
      }
    } else {
      // Стрелка идёт сверху вниз или снизу вверх
      if (dy > 0) {
        // Вниз: выходим из нижней границы, входим в верхнюю
        startX = fromCenterX
        startY = fromNode.y + NODE_HEIGHT
        endX = toCenterX
        endY = toNode.y
      } else {
        // Вверх: выходим из верхней границы, входим в нижнюю
        startX = fromCenterX
        startY = fromNode.y
        endX = toCenterX
        endY = toNode.y + NODE_HEIGHT
      }
    }

    return { startX, startY, endX, endY }
  }

  // Получаем путь для стрелки
  const getEdgePath = (
    fromNode: LearningPathNode,
    toNode: LearningPathNode,
    edge: LearningPathEdge
  ) => {
    const { startX, startY, endX, endY } = getEdgePoints(fromNode, toNode, edge)

    return `M ${startX} ${startY} L ${endX} ${endY}`
  }

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
        <div className="learning-path-legend-item">
          <span className="learning-path-legend-color purple" />
          <span>Purple Team</span>
        </div>
      </div>

      <div className="learning-path-container">
        <div className="learning-path-wrapper">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="learning-path-svg"
            preserveAspectRatio="xMidYMid meet"
          >
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
              <marker
                id="arrowhead-purple"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#9b51e0" />
              </marker>
            </defs>

            {/* Слой со стрелками */}
            <g className="learning-path-edges">
              {data.edges.map((edge, index) => {
                const fromNode = data.nodes.find(n => n.id === edge.from)
                const toNode = data.nodes.find(n => n.id === edge.to)
                if (!fromNode || !toNode) return null

                // Специальный случай: стрелка от realtime-investigation к purple-team - синяя
                let pathColor = trackColors[toNode.track].stroke
                let arrowheadTrack = toNode.track
                
                if (edge.from === 'realtime-investigation' && edge.to === 'purple-team') {
                  pathColor = trackColors.blue.stroke
                  arrowheadTrack = 'blue'
                }

                const isActive = hoveredNode === edge.from || hoveredNode === edge.to

                return (
                  <path
                    key={index}
                    d={getEdgePath(fromNode, toNode, edge)}
                    stroke={pathColor}
                    strokeWidth={isActive ? 3 : 2}
                    fill="none"
                    markerEnd={`url(#arrowhead-${arrowheadTrack})`}
                    className={`learning-path-edge ${isActive ? 'active' : ''}`}
                    opacity={isActive ? 1 : 0.4}
                  />
                )
              })}
            </g>

            {/* Слой с узлами */}
            <g className="learning-path-nodes">
              {data.nodes.map((node) => {
                const isHovered = hoveredNode === node.id
                const colors = trackColors[node.track]

                return (
                  <g
                    key={node.id}
                    className="learning-path-node"
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    style={{ cursor: 'pointer' }}
                    tabIndex={0}
                    role="button"
                    aria-label={node.name}
                  >
                    <rect
                      x={node.x}
                      y={node.y}
                      width={NODE_WIDTH}
                      height={NODE_HEIGHT}
                      rx="8"
                      ry="8"
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth={2}
                      className="learning-path-node-bg"
                    />

                    <foreignObject
                      x={node.x}
                      y={node.y}
                      width={NODE_WIDTH}
                      height={NODE_HEIGHT}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          padding: '8px 12px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <span
                          style={{
                            color: '#ffffff',
                            fontSize: '13px',
                            fontWeight: 500,
                            lineHeight: 1.4,
                            wordWrap: 'break-word',
                          }}
                        >
                          {node.name}
                        </span>
                      </div>
                    </foreignObject>
                  </g>
                )
              })}
            </g>
          </svg>
        </div>
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
              {selectedNode.track === 'purple' && 'Purple Team'}
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
