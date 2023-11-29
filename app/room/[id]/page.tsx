import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Players from './components/Players';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import GameProvider from './components/GameProvider/GameProvider';


export const dynamic = 'force-dynamic';

type RoomPageProps = {
  params: {
    id: string;
  };
};

export default async function RoomPage(props: RoomPageProps) {
  const { id } = props.params;
  const session = await getServerSession(authOptions);

  const room = await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      RoomUser: {
        include: {
          user: true,
        },
      },
      Score: true,
    },
  });

  const cards = await prisma.card.findMany({
    include: {
      ShittyQuestions: true,
    },
  });

  if (!room) {
    notFound();
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">{room.name}</h1>
      <GameProvider
        players={room.RoomUser.map((xs) => xs.user)}
        hasOwnerRights={room.ownerId === session?.user.id}
        playerId={session?.user.id!}
        initialScore={room.Score}
        roomId={room.id}
        initialActivePlayer={
          room.RoomUser.find((xs) => xs.active)?.userId || ''
        }
        cards={cards}
      >
        <Players />
      </GameProvider>
    </>
  );
}
