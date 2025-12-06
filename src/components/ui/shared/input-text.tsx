import { useFormContext } from 'react-hook-form'
import type { FC } from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface InputTextProps {
  name: string
  placeholder?: string
  label?: string
  description?: string
  type?: string
  required?: boolean
}

export const InputText: FC<InputTextProps> = (props) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {props.label}
            {props.required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              required={props.required}
              type={props.type}
              placeholder={props.placeholder}
              value={field.value ?? ''} // ⬅ FIX
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
