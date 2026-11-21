import styles from './NetworkGraphic.module.css'

const NODES = [
  { x: 60, y: 40, r: 7, tone: 'ink' },
  { x: 160, y: 24, r: 5, tone: 'ink' },
  { x: 230, y: 70, r: 9, tone: 'pop' },
  { x: 120, y: 110, r: 6, tone: 'ink' },
  { x: 40, y: 140, r: 5, tone: 'ink' },
  { x: 200, y: 160, r: 6, tone: 'accent' },
  { x: 290, y: 140, r: 5, tone: 'ink' },
  { x: 270, y: 30, r: 5, tone: 'ink' },
] as const

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [3, 5],
  [5, 6],
  [2, 7],
  [1, 7],
  [5, 2],
]

export function NetworkGraphic() {
  return (
    <svg className={styles.graphic} viewBox="0 0 320 190" fill="none" aria-hidden="true">
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          className={styles.edge}
        />
      ))}
      {NODES.map((node, i) => (
        <circle key={i} cx={node.x} cy={node.y} r={node.r} className={`${styles.node} ${styles[node.tone]}`} />
      ))}
    </svg>
  )
}
