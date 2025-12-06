import { Link, createFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { TAuthSchema } from '@/lib/validations/auth.schema'
import { authSchema } from '@/lib/validations/auth.schema'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Form } from '@/components/ui/form'
import { AuthForm } from '@/components/ui/shared/auth-form'
import { AuthHeader } from '@/components/ui/shared/auth-header'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const signUpUserForm = useForm<TAuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  //   const router = useRouter()
  // const { mutate } = useRegister()

  const handleSubmit = (values: TAuthSchema) => {
    console.log(values)
    // try {
    //   mutate(values, {
    //     onSuccess: () => {
    //       alert('Registrasi berhasil! Silakan login dengan akun Anda.')
    //       signUpUserForm.reset()
    //     },
    //   })
    // } catch (err) {
    //   throw new Error('Terjadi kesalahan saat login. Silakan coba lagi.')
    // }
  }

  return (
    <>
      <AuthHeader />
      <main className="flex min-h-screen gap-3 flex-col items-center justify-center bg-background">
        <Card className="bg-[#FFFAF0] max-w-screen">
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-normal ">Daftar</h1>{' '}
              <p className="text-sm text-muted-foreground font-medium">
                Masukkan kredensial Anda
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...signUpUserForm}>
              <AuthForm onSubmit={handleSubmit} />
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              type="submit"
              form="authform"
              className="w-full"
              disabled={signUpUserForm.formState.isSubmitting}
            >
              {signUpUserForm.formState.isSubmitting
                ? 'Logging in...'
                : 'Daftar'}
            </Button>

            <div className="text-center mt-6">
              <p>
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="text-[#118AB2] font-bold hover:underline"
                >
                  Masuk sekarang
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  )
}
