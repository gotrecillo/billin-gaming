'use client';

import { Button } from '@nextui-org/react';
import classNames from 'classnames';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const session = useSession();
  const pathname = usePathname();

  if (!session.data) {
    return <></>;
  }

  return (
    <div className="bg-gray-100 flex flex-row justify-between py-3">
      <Button as={Link} href="/" className="bg-transparent">
        <Image
          src="/logo-web-billin.png"
          priority
          alt="Logo"
          className="rounded-full"
          width={32}
          height={32}
        />
      </Button>
      <Button
        as={Link}
        href="/admin/room"
        className={classNames('bg-transparent text-lg text-slate-900', {
          ['underline']: pathname.match(/^\/admin\/room*/),
        })}
      >
        Salas
      </Button>

      <Button onClick={() => signOut()} className="bg-transparent">
        <svg
          className="w-8 h-8 fill-gray-700 rotate-180"
          version="1.1"
          viewBox="0 0 20 20"
          x="0px"
          y="0px"
        >
          <g>
            <path d="M16 18h-4a2 2 0 01-2-2v-2h2v2h4V4h-4v2h-2V4a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
            <path d="M7 5l1.5 1.5L6 9h8v2H6l2.5 2.5L7 15l-5-5 5-5z"></path>
          </g>
        </svg>
      </Button>
    </div>
  );
}
