import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { ToastProvider } from '@/components/providers/toaster-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PetNi',
  description:
    'Dê o melhor tratamento para o seu pet com quem entende do assunto!',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '48x48',
      url: '/favicon.png',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <ToastProvider />

          {children}
        </body>
      </html>
    </>
  );
}
