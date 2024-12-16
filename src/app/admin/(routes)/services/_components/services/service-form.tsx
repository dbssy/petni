'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Customer, Pet, Service, ServiceType } from '@prisma/client';
import axios from 'axios';
import { SquarePen } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  customerId: z.string().min(1, 'Um dono válido deve ser fornecido.'),
  petId: z.string().min(1, 'Um pet válido deve ser fornecido.'),
  serviceTypeId: z.string().min(1, 'Um serviço válido deve ser fornecido.'),
  status: z.enum(['WAITING', 'IN_PROGRESS', 'DONE', 'CANCELED'], {
    errorMap: () => ({
      message: 'Um status válido deve ser fornecido.',
    }),
  }),
});

interface ServiceFormProps {
  service?: Service;
  customers: Customer[];
  pets: Pet[];
  serviceTypes: ServiceType[];
  onSuccessAction?: () => void;
}

export function ServiceForm({
  service,
  customers,
  pets,
  serviceTypes,
  onSuccessAction,
}: ServiceFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const statusTypeMap = {
    WAITING: 'Aguardando início',
    IN_PROGRESS: 'Em andamento',
    DONE: 'Finalizado',
    CANCELED: 'Cancelado',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: service ? service.customerId : '',
      petId: service ? service.petId : '',
      serviceTypeId: service ? service.serviceTypeId : '',
      status: service ? service.status : 'WAITING',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = service
        ? await axios.patch(`/api/services/${service.id}`, values)
        : await axios.post('/api/services', values);

      toast.success(
        `Serviço foi ${service ? 'atualizado' : 'cadastrado'} com sucesso!`,
      );

      router.push(`/admin/services/${response.data.id}`);
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
        {service ? (
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
            {service ? 'Editar serviço' : 'Cadastrar novo serviço'}
          </DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cliente" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="petId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um pet" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {pets.map((pet) => (
                          <SelectItem key={pet.id} value={pet.id}>
                            {pet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="serviceTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serviço realizado</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {serviceTypes.map((serviceType) => (
                          <SelectItem
                            key={serviceType.id}
                            value={serviceType.id}
                          >
                            {serviceType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status do serviço</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o status" />
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
                  {service ? 'Salvar mudanças' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
