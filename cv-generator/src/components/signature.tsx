interface iSignatureProps {
  className?: string
}

export default function Signature({ className }: iSignatureProps) {
  return (
    <a href='https://github.com/synthriz' aria-label='link github' className={`items-center ${className}`}>
      <p className="text-center text-white mt-12">made with luv by <span className="underline font-bold">triz</span></p>
    </a>
  )
}