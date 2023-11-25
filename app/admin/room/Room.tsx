import { Button, Link } from '@nextui-org/react';
import { Room } from '@prisma/client';

import { deleteRoom } from './delete-room-action';
import { archiveRoom } from './archive-room-action';
import { restoreRoom } from './restore-room-action';

type RoomListItemProps = {
  room: Room;
};

export default async function RoomListItem(props: RoomListItemProps) {
  const { room } = props;
  const handleDeleteSubmit = async () => {
    'use server';
    await deleteRoom(room.id);
  };

  const handleRestoreSubmit = async () => {
    'use server';
    await restoreRoom(room.id);
  };

  const handleArchiveSubmit = async () => {
    'use server';
    await archiveRoom(room.id);
  };

  return (
    <form
      action={handleDeleteSubmit}
      key={room.id}
      className="grid grid-cols-2 gap-4 border-2 border-slate-700 rounded-lg bg-slate-50 p-4"
    >
      <Link
        href={`/admin/room/${room.id}`}
        underline="hover"
        className="text-slate-900 col-span-2"
      >
        <h2 className="text-xl font-bold break-words">{room.name}</h2>
      </Link>
      {room.archived ? (
        <Button type="submit" color="success" formAction={handleRestoreSubmit}>
          Restaurar
        </Button>
      ) : (
        <Button type="submit" color="warning" formAction={handleArchiveSubmit}>
          Archivar
        </Button>
      )}
      <Button type="submit" color="danger">
        Borrar
      </Button>
    </form>
  );
}
