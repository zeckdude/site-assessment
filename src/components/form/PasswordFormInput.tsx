import type { FormInputProps } from '@/types/component'
import { useState, type InputHTMLAttributes } from 'react'
import { FormControl, FormGroup, FormLabel, type FormControlProps } from 'react-bootstrap'
import Feedback from 'react-bootstrap/esm/Feedback'
import { Controller, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordFormInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  containerClassName: containerClass,
  control,
  id,
  labelClassName: labelClass,
  label,
  noValidate,
  ...other
}: FormInputProps<TFieldValues> & FormControlProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller<TFieldValues, TName>
      name={name as TName}
      defaultValue={'' as PathValue<TFieldValues, TName>}
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass ?? ''}>
          {label &&
            (typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClass}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            ))}
          <div className="position-relative">
            <FormControl id={id} type={showPassword ? 'text' : 'password'} {...other} {...field} isInvalid={Boolean(fieldState.error?.message)} />
            {!noValidate && fieldState.error?.message && (
              <Feedback type="invalid" className="text-start">
                {fieldState.error?.message}
              </Feedback>
            )}
            <span className="d-flex  position-absolute top-50 end-0 translate-middle-y p-0 pe-2 me-2" onClick={() => setShowPassword(!showPassword)}>
              {!fieldState.error &&
                (showPassword ? <FaEyeSlash size={18} className="cursor-pointer" /> : <FaEye size={18} className="cursor-pointer" />)}
            </span>
          </div>
        </FormGroup>
      )}
    />
  )
}

export default PasswordFormInput
