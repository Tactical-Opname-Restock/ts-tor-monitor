import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
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
// import { AuthForm } from '@/components/ui/shared/auth-form'
import { AuthHeader } from '@/components/ui/shared/auth-header'
import { InputText } from '@/components/ui/shared/input-text'
import { useRegisterMutation } from '@/hooks/mutation/use-register-mutation/use-register-mutation'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const form = useForm<TAuthSchema>({
    resolver: zodResolver(authSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const registerMutate = useRegisterMutation()

  const onSubmit = async (data: TAuthSchema) => {
    registerMutate.mutate(data, {
      onSuccess: () => {
        toast.success('Daftar Berhasil', {
          position: 'top-right',
          richColors: true,
          description: 'Harap Verifikasi Email Anda',
        })
        form.reset()
      },
      onError: () => {
        toast.error('Login Gagal', {
          position: 'top-right',
          richColors: true,
          description: 'Username atau password salah',
        })
      },
    })
  }

  return (
    <>
      <AuthHeader />
      <main className="flex min-h-screen gap-3 flex-col items-center justify-center bg-background ">
        <Card className="bg-[#FFFAF0] max-w-screen ">
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-normal ">Masuk</h1>{' '}
              <p className="text-sm text-muted-foreground font-medium">
                Masukkan kredensial Anda
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} id="authform">
                <div className="flex flex-col gap-6 mb-2">
                  <div className="grid gap-2">
                    <InputText
                      name="email"
                      type="email"
                      label="email"
                      placeholder="email"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <InputText
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="********"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  // id="authform"
                  // onClick={form.handleSubmit(onSubmit)}
                  className="w-full"
                  isLoading={registerMutate.isPending}
                >
                  Daftar
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {/* <Button
              type="submit"
              form="authform"
              className="w-full"
              disabled={signInUserForm.formState.isSubmitting}
            >
              {signInUserForm.formState.isSubmitting
                ? 'Logging in...'
                : 'Login'}
            </Button> */}

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
