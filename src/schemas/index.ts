import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Um e-mail válido deve ser fornecido.' }),
  password: z.string().min(8, 'Uma senha válida deve ser fornecida.'),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Um nome válido deve ser fornecido.'),
  email: z.string().email({ message: 'Um e-mail válido deve ser fornecido.' }),
  password: z.string().min(8, 'Uma senha de 8 caracteres deve ser fornecida.'),
});
