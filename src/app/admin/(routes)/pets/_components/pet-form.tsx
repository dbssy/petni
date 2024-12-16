'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Customer, Pet } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(1, 'Um nome válido deve ser fornecido.'),
  customerId: z.string().min(1, 'Um dono válido deve ser fornecido.'),
  species: z.string().min(1, 'Uma espécie válida deve ser fornecida.'),
  age: z.number().min(1, 'Uma idade válida deve ser fornecida.'),
  breed: z.string().min(1, 'Uma raça válida deve ser fornecida.'),
  gender: z.string().min(1, 'Um gênero válido deve ser fornecido.'),
});

export type PetWithCustomer = Pet & {
  customer: Customer;
};

interface PetFormProps {
  pet?: PetWithCustomer;
  customers: Customer[];
  onSuccessAction?: () => void;
}

export function PetForm({ pet, customers, onSuccessAction }: PetFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pet ? pet.name : '',
      customerId: pet ? pet.customerId : '',
      age: pet ? pet.age : 1,
      species: pet ? pet.species : '',
      breed: pet ? pet.breed : '',
      gender: pet ? pet.gender : '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = pet
        ? await axios.patch(`/api/pets/${pet.id}`, values)
        : await axios.post('/api/pets', values);

      toast.success(
        `Pet ${response.data.name} foi ${
          pet ? 'atualizado' : 'cadastrado'
        } com sucesso!`,
      );

      router.push(pet ? `/admin/pets/${pet.id}` : '/admin/pets');
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
        {pet ? (
          <Button variant="outline">
            <SquarePen size={18} />
          </Button>
        ) : (
          <Button variant="default">Cadastrar</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{pet ? 'Editar pet' : 'Cadastrar novo pet'}</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do pet</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Buddy"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dono</FormLabel>
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
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade (em anos)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      placeholder="2 anos"
                      value={field.value}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        field.onChange(isNaN(value) ? 0 : value);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="species"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Espécie</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Cachorro"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raça</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Caramelo"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gênero</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um gênero" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="male">Macho</SelectItem>
                      <SelectItem value="female">Fêmea</SelectItem>
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
                {pet ? 'Salvar mudanças' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
