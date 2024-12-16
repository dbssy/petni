'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
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
});

interface UserFormProps {
  user: User;
}

export function UserForm({ user }: UserFormProps) {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  function handleDialogClose(isOpen: boolean) {
    if (!isOpen) {
      router.push('/admin/users');
    }

    setIsOpen(isOpen);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`/api/users/${user.id}`, values);

      setIsOpen(false);

      toast.success(
        `Usuário ${response.data.name} foi atualizado com sucesso!`,
      );
      router.push('/admin/users');
      router.refresh();
    } catch {
      toast.error('Ocorreu um erro interno, tente novamente!');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
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

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full"
            >
              Salvar mudanças
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
