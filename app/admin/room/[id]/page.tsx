import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

type RoomPageProps = {
  params: {
    id: string;
  };
};

export default async function RoomPage(props: RoomPageProps) {
  const { id } = props.params;

  const room = await prisma.room.findUnique({
    where: {
      id,
    },
  });

  if (!room) {
    notFound();
  }

  return (
    <main className="grid p-6 xl:p-24">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{room.name}</h1>
    </main>
  );
}
