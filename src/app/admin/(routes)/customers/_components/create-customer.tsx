'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { formatPhone } from '@/lib/format';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1, 'Um nome válido deve ser fornecido.'),
  phone: z.string().min(8, 'Um telefone válido deve ser fornecido.'),
});

export function CreateCustomer() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post('/api/customers', values);

      setIsOpen(false);

      toast.success(`Cliente ${response.data.name} cadastrado com sucesso!`);
      router.push('/admin/customers');
      router.refresh();
    } catch {
      toast.error('Ocorreu um erro interno, tente novamente!');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="p-4">
          <Button variant="default">Cadastrar</Button>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar novo cliente</DialogTitle>
        </DialogHeader>

        <div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do cliente</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone do cliente</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="(11) 91234-5678"
                        value={field.value}
                        onChange={(e) => {
                          const formattedPhone = formatPhone(e.target.value);
                          field.onChange(formattedPhone);
                        }}
                      />
                    </FormControl>

                    <FormDescription>
                      O número de telefone é único para cada cliente cadastrado.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-x-2">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Cancelar
                  </Button>
                </DialogClose>

                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Cadastrar
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
