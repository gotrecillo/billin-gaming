import prisma from '@/lib/prisma';

import RoomListItem from '../components/Room';
export default async function ArchivedRoomsPage() {
  const rooms = await prisma.room.findMany({
    where: {
      archived: true,
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Salas archivadas
      </h1>
      <section className="grid col-span-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomListItem room={room} key={room.id} />
        ))}
      </section>
    </>
  );
}
