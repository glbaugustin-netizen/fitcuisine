import { dishTypes } from '../data/dishTypes'

interface CategoryIconProps {
  categoryId: string
  size?: number
  className?: string
}

export function CategoryIcon({ categoryId, size = 32, className }: CategoryIconProps) {
  const dishType = dishTypes.find((dt) => dt.id === categoryId)
  const iconFile = dishType ? dishType.icon : 'icon-autres.svg'

  return (
    <img
      src={`/icons/categories/${iconFile}`}
      alt={dishType?.label ?? 'Autre'}
      width={size}
      height={size}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0 }}
    />
  )
}
