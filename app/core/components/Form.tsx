import { validateZodSchema } from "blitz"
import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps, FormRenderProps } from "react-final-form"
import { z } from "zod"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit" | "children"> {
  /** All your form fields */
  children: (props: FormRenderProps) => ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={(formProps) => {
        const { handleSubmit, submitting, submitError } = formProps
        return (
          <form onSubmit={handleSubmit} className="form" {...props}>
            {/* Form fields supplied as children are rendered here */}
            {children(formProps)}

            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}

            {submitText && (
              <button type="submit" disabled={submitting}>
                {submitText}
              </button>
            )}
          </form>
        )
      }}
    />
  )
}

export default Form
