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
import { LockKeyhole } from 'lucide-react';

const formSchema = z.object({
  password: z.string().min(8, 'Uma senha de 8 caracteres deve ser fornecida.'),
});

interface UserFormProps {
  userId: string;
}

export function ChangeUserPassword({ userId }: UserFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.patch(`/api/users/${userId}`, values);

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <LockKeyhole className="w-5 h-5" />
        </Button>
      </DialogTrigger>

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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="password"
                      placeholder="Digite uma senha de 8 caracteres"
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
