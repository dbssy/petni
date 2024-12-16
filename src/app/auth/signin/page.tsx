'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { LoginSchema } from '@/schemas';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/admin/overview',
      });
    });

    toast.success('Login realizado com sucesso!');
  }

  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-800 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg flex flex-col items-center gap-4 w-96 p-8">
        <h1 className="text-gray-900 text-xl font-bold">Fazer Login</h1>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seu e-mail</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="Insira o seu e-mail cadastrado"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua senha</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="Digite a sua senha"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!isValid || isPending}
              className="w-full"
            >
              Entrar
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
