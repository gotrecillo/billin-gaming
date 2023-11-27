'use client';
import IconBulb from '@/components/icons/IconBulb';
import IconPoo from '@/components/icons/IconPoo';
import { Avatar, Button } from '@nextui-org/react';
import classNames from 'classnames';
import { useContext } from 'react';
import { GameContext } from './GameProvider/GameProvider';

export default function Players() {
  const {
    players,
    voteState,
    score,
    activePlayer,
    playerId,
    vote,
    isActive,
    hasOwnerRights,
    setActivePlayer,
    sendResults,
    showSubmitButtons,
  } = useContext(GameContext);
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
              {isActive && player.id !== playerId ? (
                <div className="grid grid-cols-2 items-center gap-2">
                  <button
                    onClick={() => vote('poo', player.id, isPooed)}
                    className={classNames(
                      'bg-transparent rounded-xl border-2 ',
                      { ['border-yellow-700']: isPooed && isActive },
                      { ['border-transparent']: !(isPooed && isActive) }
                    )}
                  >
                    <IconPoo className="w-9 h-9" />
                  </button>
                  <button
                    onClick={() => vote('bulb', player.id, isBulbed)}
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

              {hasOwnerRights && (
                <Button
                  className="col-span-3"
                  isDisabled={player.id === activePlayer}
                  onClick={() => setActivePlayer(player.id)}
                >
                  {player.id === activePlayer ? 'Activo' : 'Inactivo'}
                </Button>
              )}
            </div>
          );
        })}
      </section>
      {hasOwnerRights && (
        <section className="grid grid-cols-2 w-full">
          {showSubmitButtons ? (
            <>
              <Button
                onClick={() => sendResults('poo')}
                className="mr-2 bg-white border-2 border-yellow-700 fit-content"
                endContent={<IconPoo className="w-8 h-8" />}
              >
                Ganan los mierdosos
              </Button>
              <Button
                onClick={() => sendResults('bulb')}
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
