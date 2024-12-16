'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ServiceType } from '@prisma/client';
import axios from 'axios';
import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1, 'Um nome válido deve ser fornecido.'),
  price: z.coerce.number().min(1, 'O valor pago deve ser maior que 1.'),
});

interface ServiceTypesFormProps {
  serviceType?: ServiceType;
  onSuccessAction?: () => void;
}

export function ServiceTypesForm({
  serviceType,
  onSuccessAction,
}: ServiceTypesFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: serviceType ? serviceType.name : '',
      price: serviceType ? serviceType.price : 1,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = serviceType
        ? await axios.patch(`/api/serviceTypes/${serviceType.id}`, values)
        : await axios.post('/api/serviceTypes', values);

      toast.success(
        `Serviço ${response.data.name} foi ${
          serviceType ? 'atualizado' : 'cadastrado'
        } com sucesso!`,
      );

      router.push('/admin/services');
      router.refresh();
      setIsOpen(false);

      if (onSuccessAction) {
        onSuccessAction();
      }
    } catch {
      toast.error('Ocorreu um erro interno, tente novamente!');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {serviceType ? (
          <Button variant="outline">
            <SquarePen size={18} />
          </Button>
        ) : (
          <Button variant="default">Cadastrar</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {serviceType
              ? 'Editar tipo de serviço'
              : 'Cadastrar novo tipo de serviço'}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do serviço</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Banho Completo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      step="0.01"
                      placeholder="24,90"
                      {...field}
                    />
                  </FormControl>
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
                {serviceType ? 'Salvar mudanças' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
