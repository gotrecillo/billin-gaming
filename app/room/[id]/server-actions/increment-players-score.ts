'use server';
import prisma from '@/lib/prisma';
import pusher from '@/lib/pusher/server';

export const incrementPlayersScore = async (
  roomId: string,
  players: string[],
  type: 'poo' | 'bulb'
) => {
  players.forEach(async (player) => {
    await prisma.score.upsert({
      where: {
        Score_roomId_userId_unique: {
          roomId,
          userId: player,
        },
      },
      update: {
        score: {
          increment: 1,
        },
      },
      create: {
        userId: player,
        roomId,
        score: 1,
      },
    });
  });

  pusher.trigger(`room-${roomId}`, 'increment-players-score', {
    type,
  });
};
