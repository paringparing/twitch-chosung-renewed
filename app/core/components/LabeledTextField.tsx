import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps} style={{ width: "100%", ...outerProps?.style }}>
        <label {...labelProps}>
          <div style={{ paddingLeft: 24 }}>{label}</div>
          <input {...input} disabled={submitting} {...props} ref={ref} />
        </label>

        {touched && normalizedError && (
          <div role="alert" style={{ color: "red" }}>
            {normalizedError}
          </div>
        )}

        <style jsx>{`
          label {
            display: flex;
            flex-direction: column;
            align-items: start;
            font-size: 24px;
            font-weight: 800;
          }
          input {
            font-size: 24px;
            font-weight: 800;
            width: 100%;
            background: rgba(255, 255, 255, 0.2);
            height: 60px;
            padding-left: 24px;
            padding-right: 24px;
            border-radius: 20px;
            border: none;
            appearance: none;
            margin-top: 0.5rem;
          }
          input:focus {
            outline: none;
          }
        `}</style>
      </div>
    )
  }
)

export default LabeledTextField
