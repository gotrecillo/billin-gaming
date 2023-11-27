import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import UserRoomListItem from '../components/UserRoomListItem';

type RoomPageProps = {
  params: {
    id: string;
  };
};

export default async function RoomPage(props: RoomPageProps) {
  const { id } = props.params;
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      RoomUser: { where: { roomId: id } },
    },
  });
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
      <section className="grid col-span-2 grid-cols-1 lg:grid-cols-2 gap-4">
        {users.map((user) => (
          <UserRoomListItem
            key={user.id}
            room={room}
            user={user}
            invited={!!user.RoomUser.length}
          />
        ))}
      </section>
    </main>
  );
}
