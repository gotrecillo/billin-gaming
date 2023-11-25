'use client';
import { NextUIProvider } from '@nextui-org/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
export { SessionProvider } from 'next-auth/react';

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <Navbar />
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SessionProvider>
  );
}
