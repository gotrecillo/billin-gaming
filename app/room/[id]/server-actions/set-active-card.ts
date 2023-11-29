'use server';
import pusher from '@/lib/pusher/server';

export const setActiveCard = async (roomId: string, index: number) => {
  pusher.trigger(`room-${roomId}`, 'set-active-card', {
    index,
  });
};
