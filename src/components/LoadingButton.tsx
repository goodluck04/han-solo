import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

export function ButtonLoading() {
  return (
    <Button disabled>
      <RotateCcw  className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}
