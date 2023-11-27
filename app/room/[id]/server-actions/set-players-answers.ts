'use server';
import pusher from '@/lib/pusher/server';

export const setPlayersAnswers = async (
  roomId: string,
  answers: { pooedPlayers: string[]; bulbedPlayers: string[] }
) => {
  pusher.trigger(`room-${roomId}`, 'set-players-answers', {
    answers,
  });
};
