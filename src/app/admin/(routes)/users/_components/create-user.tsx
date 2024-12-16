'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1, 'Um nome válido deve ser fornecido.'),
  email: z.string().email({ message: 'Um e-mail válido deve ser fornecido.' }),
  password: z.string().min(8, 'Uma senha de 8 caracteres deve ser fornecida.'),
});

interface CreateUserProps {
  onSuccessAction: () => void;
}

export function CreateUser({ onSuccessAction }: CreateUserProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post('/api/users', values);

      setIsOpen(false);

      toast.success(
        `Usuário ${response.data.name} foi cadastrado com sucesso!`,
      );
      router.push('/admin/users');
      router.refresh();

      onSuccessAction();
    } catch {
      toast.error('Ocorreu um erro interno, tente novamente!');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Cadastrar</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo usuário</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do usuário</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Digite o nome do novo usuário"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="email"
                      placeholder="Informe o melhor e-mail deste usuário"
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
                  <FormLabel>Senha</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="password"
                      placeholder="Digite uma senha com 8 caracteres"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              Cadastrar
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
