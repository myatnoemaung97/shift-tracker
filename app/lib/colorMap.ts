export const colorMap = {
  red: {
    background: 'bg-red-500',
    border: 'border-l-red-500',
    ring: 'ring-red-500'
  },
  blue: {
    background: 'bg-blue-500',
    border: 'border-l-blue-500',
    ring: 'ring-blue-500'
  },
  green: {
    background: 'bg-green-500',
    border: 'border-l-green-500',
    ring: 'ring-green-500'
  },
  yellow: {
    background: 'bg-yellow-500',
    border: 'border-l-yellow-500',
    ring: 'ring-yellow-500'
  },
  olive: {
    background: 'bg-olive-500',
    border: 'border-l-olive-500',
    ring: 'ring-olive-500'
  },
  pink: {
    background: 'bg-pink-500',
    border: 'border-l-pink-500',
    ring: 'ring-pink-500'
  }
}

export type JobColor = keyof typeof colorMap;