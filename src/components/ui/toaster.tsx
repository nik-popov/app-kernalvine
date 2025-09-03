"use client"

import { useToast, toast as toastFn } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Button } from "./button"
import { Copy } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  const handleCopy = (error: any) => {
    let errorString = ""
    try {
      errorString = JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
    } catch (e) {
      errorString = "Could not stringify the error object."
    }
    navigator.clipboard.writeText(errorString)
    toastFn({
        title: "Copied to clipboard",
        description: "Error details have been copied.",
    })
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, error, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
               {variant === "destructive" && error && (
                <div className="mt-2">
                    <Button size="sm" variant="outline" className="gap-2" onClick={() => handleCopy(error)}>
                        <Copy />
                        Copy Error
                    </Button>
                </div>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
