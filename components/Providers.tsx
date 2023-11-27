'use client';
import { NextUIProvider } from '@nextui-org/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export { SessionProvider } from 'next-auth/react';

import Navbar from './Navbar';

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const router = useRouter();
  if (!session) {
    return <>{children}</>;
  }

  return (
    <SessionProvider session={session}>
      <NextUIProvider navigate={router.push}>
        <Navbar />
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
}
