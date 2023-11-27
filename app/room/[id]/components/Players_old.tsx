'use client';
import IconBulb from '@/components/icons/IconBulb';
import IconPoo from '@/components/icons/IconPoo';
import { Avatar, Button } from '@nextui-org/react';
import { User } from '@prisma/client';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { setActivePlayer as setActivePlayerInServer } from '../server-actions/set-active-player';
import { setPlayersAnswers } from '../server-actions/set-players-answers';
import pusher from '@/lib/pusher/client';
import { incrementPlayersScore } from '../server-actions/increment-players-score';

type PlayersProps = {
  roomId: string;
  players: User[];
  hasOwnerRights: boolean;
  initialActivePlayer: string;
  userId: string;
  initialScore: {
    userId: string;
    score: number;
  }[];
};

export default function Players(props: PlayersProps) {
  const { players, userId, initialScore, roomId, initialActivePlayer } = props;
  const [score, setScore] = useState(initialScore);
  const [voteState, setVoteState] = useState<{
    pooedPlayers: string[];
    bulbedPlayers: string[];
  }>({ pooedPlayers: [], bulbedPlayers: [] });

  const [activePlayer, setActivePlayer] = useState<string>(initialActivePlayer);

  const resetGame = () => {
    setVoteState({ pooedPlayers: [], bulbedPlayers: [] });
  };

  const isActive = userId === activePlayer;

  const showSubmitButtons =
    voteState.pooedPlayers.length + voteState.bulbedPlayers.length ===
    players.length - 1;

  const handleVote = (
    type: 'poo' | 'bulb',
    playerId: string,
    status: boolean
  ) => {
    let newVoteState = { ...voteState };
    if (type === 'poo') {
      if (status) {
        newVoteState = {
          ...voteState,
          pooedPlayers: voteState.pooedPlayers.filter((id) => id !== playerId),
        };
      } else {
        newVoteState = {
          ...voteState,
          bulbedPlayers: voteState.bulbedPlayers.filter(
            (id) => id !== playerId
          ),
          pooedPlayers: [...voteState.pooedPlayers, playerId],
        };
      }
    } else {
      if (status) {
        newVoteState = {
          ...voteState,
          bulbedPlayers: voteState.bulbedPlayers.filter(
            (id) => id !== playerId
          ),
        };
      } else {
        newVoteState = {
          ...voteState,
          pooedPlayers: voteState.pooedPlayers.filter((id) => id !== playerId),
          bulbedPlayers: [...voteState.bulbedPlayers, playerId],
        };
      }
    }
    setVoteState(newVoteState);
    setPlayersAnswers(roomId, newVoteState);
  };

  const incrementScores = (winners: 'poo' | 'bulb') => {
    const chosenPlayers =
      winners === 'poo' ? voteState.pooedPlayers : voteState.bulbedPlayers;
    const temporalScore = [...score];

    chosenPlayers.forEach((id) => {
      const scoreIndex = score.findIndex((xs) => xs.userId === id);
      if (scoreIndex !== -1) {
        temporalScore[scoreIndex].score += 1;
      } else {
        temporalScore.push({ userId: id, score: 1 });
      }
    });
    setScore(temporalScore);
    setActivePlayer('');
    resetGame();
  };

  const handleSubmitResults = (winners: 'poo' | 'bulb') => {
    const chosenPlayers =
      winners === 'poo' ? voteState.pooedPlayers : voteState.bulbedPlayers;
    incrementPlayersScore(roomId, chosenPlayers, winners);
  };

  const handleSetActivePlayer = (playerId: string) => {
    setActivePlayer(playerId);
    setActivePlayerInServer(roomId, playerId);
  };

  useEffect(() => {
    const channel = pusher.subscribe(`room-${roomId}`);
    channel.bind('set-active-player', (data: { userId: string }) => {
      setActivePlayer(data.userId);
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

  return (
    <>
      <section className="grid col-span-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {players.map((player) => {
          const isPooed = voteState.pooedPlayers.includes(player.id);
          const isBulbed = voteState.bulbedPlayers.includes(player.id);
          const playerScore = score.find((xs) => xs.userId === player.id)
            ?.score;
          return (
            <div
              key={player.id}
              className={classNames(
                'border-2  rounded-lg bg-slate-50 p-4 items-center break-words grid gap-2 grid-cols-[auto_1fr_auto]',
                {
                  ['border-slate-700']: player.id !== activePlayer,
                  ['border-lime-600']: player.id === activePlayer,
                }
              )}
            >
              <Avatar src={player.image ?? ''} />
              <p className="text-slate-900 text-ellipsis">
                {player.name?.split(' ')[0]}
              </p>
              {isActive && player.id !== userId ? (
                <div className="grid grid-cols-2 items-center gap-2">
                  <button
                    onClick={() => handleVote('poo', player.id, isPooed)}
                    className={classNames(
                      'bg-transparent rounded-xl border-2 ',
                      { ['border-yellow-700']: isPooed && isActive },
                      { ['border-transparent']: !(isPooed && isActive) }
                    )}
                  >
                    <IconPoo className="w-9 h-9" />
                  </button>
                  <button
                    onClick={() => handleVote('bulb', player.id, isBulbed)}
                    className={classNames(
                      'bg-transparent  rounded-xl border-2',
                      { ['border-yellow-300']: isBulbed && isActive },
                      { ['border-transparent']: !(isBulbed && isActive) }
                    )}
                  >
                    <IconBulb className="w-9 h-9" />
                  </button>
                </div>
              ) : (
                <p className="text-slate-900">{playerScore ?? 0}</p>
              )}

              {props.hasOwnerRights && (
                <Button
                  className="col-span-3"
                  isDisabled={player.id === activePlayer}
                  onClick={() => handleSetActivePlayer(player.id)}
                >
                  {player.id === activePlayer ? 'Activo' : 'Inactivo'}
                </Button>
              )}
            </div>
          );
        })}
      </section>
      {props.hasOwnerRights && (
        <section className="grid grid-cols-2 w-full">
          {showSubmitButtons ? (
            <>
              <Button
                onClick={() => handleSubmitResults('poo')}
                className="mr-2 bg-white border-2 border-yellow-700 fit-content"
                endContent={<IconPoo className="w-8 h-8" />}
              >
                Ganan los mierdosos
              </Button>
              <Button
                onClick={() => handleSubmitResults('bulb')}
                className="bg-white border-2 border-yellow-300 fit-content"
                endContent={<IconBulb className="w-8 h-8" />}
              >
                Ganan los ingeniosos
              </Button>
            </>
          ) : (
            <h2>
              {voteState.bulbedPlayers.length + voteState.pooedPlayers.length} /{' '}
              {players.length - 1}
            </h2>
          )}
        </section>
      )}
    </>
  );
}
