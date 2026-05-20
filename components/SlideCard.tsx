// components/SlideCard.tsx
interface SlideCardProps {
  slide: { title: string; content: string }
  index: number
}

export function SlideCard({ slide, index }: SlideCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 min-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 bg-neutral-100 rounded text-xs flex items-center justify-center
                         text-neutral-500 font-medium">
          {index + 1}
        </span>
        <h4 className="font-medium text-neutral-900">{slide.title}</h4>
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed">{slide.content}</p>
    </div>
  )
}
