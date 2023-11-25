import { getProviders } from 'next-auth/react';
import ProvidersList from './components/ProvidersList';
import Image from 'next/image';

export default async function SignInPage() {
  const providers = await getProviders();
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl sm:border sm:border-gray-100 sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 sm:border-b sm:border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Image
            src="/logo-web-billin.png"
            priority
            alt="Logo"
            className="rounded-full"
            width={90}
            height={90}
          />
          <ProvidersList providers={providers!} />
        </div>
      </div>
    </div>
  );
}
