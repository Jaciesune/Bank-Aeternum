import { Loader2 } from "lucide-react"
import { type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"

type SubmitButtonProps = {
  form: UseFormReturn<any>
  loadingText?: string
  buttonText?: string
  className?: string
}

const SubmitButton = ({
  form,
  loadingText = "Transakcja w toku...",
  buttonText = "Wykonaj",
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      disabled={
        form.formState.isSubmitting ||
        !form.formState.isDirty ||
        !form.formState.isValid
      }
      className={className}
      type="submit"
    >
      {form.formState.isSubmitting && (
        <Loader2 className="mr-2 size-4 animate-spin" />
      )}

      {form.formState.isSubmitting ? loadingText : buttonText}
    </Button>
  )
}

export default SubmitButton
