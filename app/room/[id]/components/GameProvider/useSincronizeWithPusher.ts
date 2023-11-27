import pusher from '@/lib/pusher/client';
import { useEffect } from 'react';

type UseSincroizeWithPusherProps = {
  roomId: string;
  setActivePlayerState: (userId: string) => void;
  resetGame: () => void;
  setVoteState: (answers: {
    pooedPlayers: string[];
    bulbedPlayers: string[];
  }) => void;
  incrementScores: (type: 'poo' | 'bulb') => void;
};

export const useSincronizeWithPusher = (props: UseSincroizeWithPusherProps) => {
  const {
    roomId,
    setActivePlayerState,
    resetGame,
    setVoteState,
    incrementScores,
  } = props;
  useEffect(() => {
    const channel = pusher.subscribe(`room-${roomId}`);
    channel.bind('set-active-player', (data: { userId: string }) => {
      setActivePlayerState(data.userId);
      resetGame();
    });
    channel.bind(
      'set-players-answers',
      (data: {
        answers: { pooedPlayers: string[]; bulbedPlayers: string[] };
      }) => {
        setVoteState(data.answers);
      }
    );
    channel.bind(
      'increment-players-score',
      (data: { type: 'poo' | 'bulb' }) => {
        console.log(data, 'data');
        incrementScores(data.type);
      }
    );

    return () => {
      channel.unbind('set-active-player');
      channel.unbind('set-players-answers');
      pusher.unsubscribe(`room-${roomId}`);
    };
  });
};
