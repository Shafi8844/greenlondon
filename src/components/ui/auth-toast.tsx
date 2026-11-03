import { CheckCircle2 } from "lucide-react"

export function AuthToast({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-[#16834e] px-5 py-4 text-sm font-medium text-white shadow-lg"
    >
      <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" />
      {message}
    </div>
  )
}
