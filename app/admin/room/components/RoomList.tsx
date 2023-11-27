import { Room } from '@prisma/client';
import RoomListItem from './Room';
import Link from 'next/link';

type RoomListProps = {
  rooms: Room[];
};

export default async function RoomList(props: RoomListProps) {
  const { rooms } = props;

  return (
    <section className="grid grid-cols-[1fr_auto] gap-4 align-middle py-4">
      <h1 className="text-3xl font-bold text-slate-900">Lista de salas</h1>
      <Link
        href="/admin/room/archived"
        className="text-slate-900 hover:underline self-end"
      >
        Ver salas archivadas
      </Link>
      <section className="grid col-span-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomListItem room={room} key={room.id} />
        ))}
      </section>
    </section>
  );
}
