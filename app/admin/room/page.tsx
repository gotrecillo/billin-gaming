import CreateRoomForm from './components/CreateRoomForm';
import RoomList from './components/RoomList';
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
