import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { Oval } from "react-loader-spinner"
import clsx from "clsx"
import { Colors } from "app/game/constants"

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
  loading?: boolean
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, loading, outerProps, fieldProps, labelProps, ...props }, ref) => {
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
          <div className={clsx("input", { pr: loading })}>
            <input {...input} disabled={submitting} {...props} ref={ref} />
            {loading && <Oval width={24} height={24} />}
          </div>
        </label>

        {touched && normalizedError && (
          <div
            role="alert"
            style={{ color: Colors.red, fontSize: 16, paddingLeft: 24, paddingTop: 6 }}
          >
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
            border: none;
            height: 100%;
            flex-grow: 1;
            padding-left: 24px;
            padding-right: 24px;
            background: transparent;
          }
          .input {
            overflow: hidden;
            gap: 12px;
            align-items: center;
            display: flex;
            font-size: 24px;
            font-weight: 800;
            width: 100%;
            background: rgba(255, 255, 255, 0.2);
            height: 60px;
            border-radius: 20px;
            border: none;
            appearance: none;
            margin-top: 0.5rem;
          }
          .input.pr {
            padding-right: 16px;
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
