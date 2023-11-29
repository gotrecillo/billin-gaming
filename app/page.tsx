import prisma from '@/lib/prisma';
import Link from 'next/link';


export const dynamic = 'force-dynamic';

export default async function Home() {
  const rooms = await prisma.room.findMany({ where: { archived: false } });

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Salas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Link
            href={`/room/${room.id}`}
            key={room.id}
            className="border-2 border-slate-700 rounded-lg bg-slate-50 p-4 break-words"
          >
            <h2 className="text-xl font-bold text-slate-900">{room.name}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
