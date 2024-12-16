'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Customer } from '@prisma/client';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatPhone } from '@/lib/format';

const formSchema = z.object({
  name: z.string().min(1, 'Um nome válido deve ser fornecido.'),
  phone: z.string().min(8, 'Um telefone válido deve ser fornecido.'),
});

interface CustomerFormProps {
  customer?: Customer;
  onSuccessAction?: () => void;
}

export function CustomerForm({ customer, onSuccessAction }: CustomerFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer?.name || '',
      phone: customer ? formatPhone(customer.phone) : '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const endpoint = customer
      ? `/api/customers/${customer.id}`
      : '/api/customers';
    const method = customer ? 'patch' : 'post';

    try {
      const { data } = await axios[method](endpoint, values);

      toast.success(
        `Cliente ${data.name} ${
          customer ? 'atualizado' : 'cadastrado'
        } com sucesso!`,
      );

      router.refresh();
      setIsOpen(false);

      if (onSuccessAction) {
        onSuccessAction();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error('Já existe um cliente com esse telefone!');
        return;
      }
      toast.error('Ocorreu um erro interno, tente novamente!');
    }
  };

  const renderFormField = (
    name: keyof z.infer<typeof formSchema>,
    label: string,
    placeholder: string,
    description?: string,
  ) => (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              disabled={form.formState.isSubmitting}
              placeholder={placeholder}
              value={name === 'phone' ? formatPhone(field.value) : field.value}
              onChange={(e) =>
                field.onChange(
                  name === 'phone'
                    ? formatPhone(e.target.value)
                    : e.target.value,
                )
              }
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {customer ? (
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
            {customer ? 'Editar cliente' : 'Cadastrar novo cliente'}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {renderFormField('name', 'Nome do cliente', 'John Doe')}
            {renderFormField(
              'phone',
              'Telefone do cliente',
              '(11) 91234-5678',
              'O número de telefone é único para cada cliente cadastrado.',
            )}

            <div className="flex items-center gap-x-2">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                {customer ? 'Salvar mudanças' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
