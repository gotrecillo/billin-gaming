'use server';
import prisma from '@/lib/prisma';
import pusher from '@/lib/pusher/server';

export const setActivePlayer = async (roomId: string, userId: string) => {
  await prisma.roomUser.updateMany({
    where: {
      roomId,
    },
    data: {
      active: false,
    },
  });
  await prisma.roomUser.update({
    where: {
      RoomUser_roomId_userId_unique: {
        roomId,
        userId,
      },
    },
    data: {
      active: true,
    },
  });

  pusher.trigger(`room-${roomId}`, 'set-active-player', {
    userId,
  });
};
