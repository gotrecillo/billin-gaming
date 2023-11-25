'use client';

import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';

type ProvidersListProps = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>;
};

export default function ProvidersList({ providers }: ProvidersListProps) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = (providerId: string) => {
    setIsSigningIn(true);
    signIn(providerId);
  };

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            disabled={isSigningIn}
            className="disabled:cursor-default disabled:text-slate-700 disabled:border-slate-200 px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 font-sans"
            onClick={() => handleSignIn(provider.id)}
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt={provider.name}
              width={6}
              height={6}
              className={`w-6 h-6 ${isSigningIn ? 'animate-spin' : ''}`}
            />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
