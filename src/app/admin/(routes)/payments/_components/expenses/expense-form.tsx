/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Payment } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().nullable().optional(),
  value: z.coerce.number().min(1, 'O valor pago deve ser maior que 1.'),
  methodType: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'MONEY', 'ANOTHER'], {
    errorMap: () => ({
      message: 'Selecione uma forma de pagamento válida.',
    }),
  }),
  paidAt: z.date(),
  status: z.enum(['AWAITING_PAYMENT', 'PAID'], {
    errorMap: () => ({ message: 'Selecione um status válido.' }),
  }),
});

interface ExpenseFormProps {
  payment?: Payment;
  onSuccessAction?: () => void;
}

export function ExpenseForm({ payment, onSuccessAction }: ExpenseFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const methodTypeMap = {
    CREDIT_CARD: 'Cartão de Crédito',
    DEBIT_CARD: 'Cartão de Débito',
    PIX: 'Pix',
    MONEY: 'Dinheiro',
    ANOTHER: 'Outras maneiras',
  };

  const statusTypeMap = {
    AWAITING_PAYMENT: 'Aguardando pagamento',
    PAID: 'Pago',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: payment ? payment.name : '',
      value: payment ? payment.value : 1,
      methodType: payment ? payment.methodType : 'PIX',
      paidAt: payment?.paidAt ? new Date(payment.paidAt) : new Date(),
      status: payment ? payment.status : 'AWAITING_PAYMENT',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = {
        ...values,
        type: 'EXPENSE',
      };

      payment
        ? await axios.patch(`/api/payments/${payment.id}`, data)
        : await axios.post('/api/payments', data);

      toast.success(
        `Pagamento foi ${payment ? 'atualizado' : 'cadastrado'} com sucesso!`,
      );

      router.push('/admin/payments');
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
        <Button variant="default">Cadastrar</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {payment ? 'Editar pagamento' : 'Cadastrar novo pagamento'}
          </DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Dê um nome ao pagamento"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="value"
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

              <FormField
                name="methodType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de pagamento</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a forma de pagamento" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.entries(methodTypeMap).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paidAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do pagamento</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={
                          field.value
                            ? field.value.toISOString().split('T')[0]
                            : ''
                        }
                        onChange={(e) => {
                          const dateValue = e.target.value
                            ? new Date(e.target.value)
                            : null;

                          field.onChange(dateValue);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status do pagamento" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {Object.entries(statusTypeMap).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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
                  {payment ? 'Salvar mudanças' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
