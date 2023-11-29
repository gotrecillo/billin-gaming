'use server';
import prisma from '@/lib/prisma';
import pusher from '@/lib/pusher/server';

export const resetScore = async (roomId: string) => {
  await prisma.score.deleteMany({
    where: { roomId },
  });

  pusher.trigger(`room-${roomId}`, 'score-reset', {});
};
