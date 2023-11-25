import CreateRoomForm from './CreateRoomForm';
import RoomList from './RoomList';
import prisma from '@/lib/prisma';

export default async function RoomCreatePage() {
  const rooms = await prisma.room.findMany({ where: { archived: false } });

  return (
    <>
      <CreateRoomForm />
      <RoomList rooms={rooms} />
    </>
  );
}
