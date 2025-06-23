
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastContent,
  ToastProvider,
  ToastViewport,
  ToastAction,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <ToastContent
              variant={variant}
              title={title}
              description={description}
            />
            {action && (
              <ToastAction
                altText={action.altText || action.label || "Action"}
                onClick={action.onClick}
              >
                {action.label}
              </ToastAction>
            )}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
