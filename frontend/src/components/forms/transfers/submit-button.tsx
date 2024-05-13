import { Loader2 } from "lucide-react"
import { type UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"

type SubmitButtonProps = {
  form: UseFormReturn<any>
}

const SubmitButton = ({ form }: SubmitButtonProps) => {
  return (
    <Button
      disabled={
        form.formState.isSubmitting ||
        !form.formState.isDirty ||
        !form.formState.isValid
      }
      className="w-full"
      type="submit"
    >
      {form.formState.isSubmitting && (
        <Loader2 className="mr-2 size-4 animate-spin" />
      )}

      {form.formState.isSubmitting ? "Transakcja w toku..." : "Wykonaj"}
    </Button>
  )
}
export default SubmitButton
