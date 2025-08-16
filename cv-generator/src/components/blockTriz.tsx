interface iBlockText {
  prefix: string
  blocktext: string
  suffix?: string
  className?: string
}

export default function BlockText({ prefix, blocktext, suffix, className }: iBlockText) {
  return (
    <blockquote className={`text-center text-2xl font-semibold text-gray-900 italic dark:text-white ${className}`}>
      {prefix}
      <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-emerald-950 mx-2">
        <span className="relative text-emerald-400 hover:text-emerald-300">{blocktext}</span>
      </span>
      {suffix}
    </blockquote>
  )
}