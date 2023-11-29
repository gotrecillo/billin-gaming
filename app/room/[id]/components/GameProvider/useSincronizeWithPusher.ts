import pusher from '@/lib/pusher/client';
import { useEffect } from 'react';

type UseSincroizeWithPusherProps = {
  roomId: string;
  setActivePlayerState: (userId: string) => void;
  resetVotes: () => void;
  setVoteState: (answers: {
    pooedPlayers: string[];
    bulbedPlayers: string[];
  }) => void;
  resetScores: () => void;
  incrementScores: (type: 'poo' | 'bulb') => void;
  setActiveCardIndex: (index: number) => void;
};

export const useSincronizeWithPusher = (props: UseSincroizeWithPusherProps) => {
  const {
    roomId,
    setActivePlayerState,
    resetVotes,
    setVoteState,
    incrementScores,
    resetScores,
    setActiveCardIndex,
  } = props;
  useEffect(() => {
    const channel = pusher.subscribe(`room-${roomId}`);
    channel.bind('set-active-player', (data: { userId: string }) => {
      setActivePlayerState(data.userId);
      resetVotes();
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
        incrementScores(data.type);
      }
    );
    channel.bind('score-reset', () => {
      resetVotes();
      resetScores();
    });
    channel.bind('set-active-card', (data: { index: number }) => {
      setActiveCardIndex(data.index);
    });

    return () => {
      channel.unbind('set-active-player');
      channel.unbind('set-players-answers');
      channel.unbind('increment-players-score');
      channel.unbind('score-reset');
      channel.unbind('set-active-card');
      pusher.unsubscribe(`room-${roomId}`);
    };
  });
};
