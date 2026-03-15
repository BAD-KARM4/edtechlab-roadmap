'use client'

import { useState, useMemo } from 'react'
import type { LearningPathData, LearningPathNode } from '@/lib/i18n'

interface LearningPathProps {
  data: LearningPathData
  locale: string
}

const NODE_WIDTH = 220
const NODE_HEIGHT = 100
const NODE_PADDING = 16

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
    return maxY + NODE_HEIGHT + 250
  }, [data.nodes])

  // Вычисляем точку пересечения линии с границей прямоугольника
  const getBorderIntersection = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number
  ) => {
    // Половины размеров
    const halfW = rectWidth / 2
    const halfH = rectHeight / 2
    
    // Центр прямоугольника
    const centerX = rectX + halfW
    const centerY = rectY + halfH
    
    // Разница от центра до целевой точки
    const diffX = centerX - fromX
    const diffY = centerY - fromY
    
    // Защита от деления на 0
    if (Math.abs(diffX) < 0.001 && Math.abs(diffY) < 0.001) {
      return { x: centerX, y: centerY }
    }
    
    // Вычисляем масштаб для пересечения с границей
    const scaleX = Math.abs(diffX) > 0.001 ? halfW / Math.abs(diffX) : Infinity
    const scaleY = Math.abs(diffY) > 0.001 ? halfH / Math.abs(diffY) : Infinity
    
    // Выбираем меньший масштаб (ближняя граница)
    const scale = Math.min(scaleX, scaleY)
    
    return {
      x: fromX + diffX * scale,
      y: fromY + diffY * scale
    }
  }

  // Получаем путь для стрелки (от границы до границы прямоугольника)
  const getEdgePath = (fromNode: LearningPathNode, toNode: LearningPathNode) => {
    const fromCenterX = fromNode.x + NODE_WIDTH / 2
    const fromCenterY = fromNode.y + NODE_HEIGHT / 2
    const toCenterX = toNode.x + NODE_WIDTH / 2
    const toCenterY = toNode.y + NODE_HEIGHT / 2

    // Точка выхода из исходного прямоугольника
    const startPoint = getBorderIntersection(
      fromCenterX,
      fromCenterY,
      toCenterX,
      toCenterY,
      fromNode.x,
      fromNode.y,
      NODE_WIDTH,
      NODE_HEIGHT
    )

    // Точка входа в целевой прямоугольник (с отступом)
    const endPoint = getBorderIntersection(
      toCenterX,
      toCenterY,
      fromCenterX,
      fromCenterY,
      toNode.x,
      toNode.y,
      NODE_WIDTH,
      NODE_HEIGHT
    )

    // Небольшой отступ, чтобы стрелка не заходила на текст
    const padding = 8
    const dx = endPoint.x - startPoint.x
    const dy = endPoint.y - startPoint.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const ratio = (distance - padding) / distance
    
    const finalEndX = startPoint.x + dx * ratio
    const finalEndY = startPoint.y + dy * ratio

    return `M ${startPoint.x} ${startPoint.y} L ${finalEndX} ${finalEndY}`
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
                      strokeWidth={isHovered ? 3 : 2}
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
