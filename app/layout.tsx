import { Space_Grotesk as SpaceGrotesk, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const spaceGrotesk = SpaceGrotesk({
  variable: '--space-grotesk',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--inter',
  subsets: ['latin'],
});

const title = 'Billin Gaming';
const description = 'App para ayudarnos en esas tardes de juegos';

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

export const viewport = {
  themeColor: '#cbd5e1',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-slate-300`}
      >
        <Providers session={session}>
          <main className="p-4 sm:p-8 lg:p-12 max-w-6xl m-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
