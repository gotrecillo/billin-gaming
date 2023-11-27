import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Players from './components/Players';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import GameProvider from './components/GameProvider/GameProvider';

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
      >
        <Players />
      </GameProvider>
    </>
  );
}
