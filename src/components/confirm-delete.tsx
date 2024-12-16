'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash } from 'lucide-react';

interface ConfirmDeleteProps {
  id: string | undefined;
  href: string;
  label: string;
}

export function ConfirmDelete({ id, href, label }: ConfirmDeleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleConfirmDelete() {
    try {
      setIsLoading(true);
      setIsOpen(false);

      await axios.delete(`/api/${href}/${id}`);

      toast.success(`${label} foi deletado com sucesso!`);
      router.push('/admin/overview');
    } catch {
      toast.error('Ocorreu um erro interno, tente novamente!');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Essa ação não poderá ser desfeita!
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={handleConfirmDelete}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
