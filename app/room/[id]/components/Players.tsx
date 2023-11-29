'use client';
import IconBulb from '@/components/icons/IconBulb';
import IconPoo from '@/components/icons/IconPoo';
import { Avatar, Button } from '@nextui-org/react';
import classNames from 'classnames';
import { useContext } from 'react';
import { GameContext } from './GameProvider/GameProvider';
import IconStar from '@/components/icons/IconStar';
import ShittyQuestion from './ShittyQuestion';

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
    resetGame,
    card,
    activeCardIndex,
    cardsCount,
    setActiveCardIndex,
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
                'border-2  rounded-lg bg-slate-50 p-4 items-center break-words grid gap-2 grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto_auto]',
                {
                  ['border-slate-700']: player.id !== activePlayer,
                  ['border-lime-600']: player.id === activePlayer,
                }
              )}
            >
              {/* Make a rating system with a maximum of 6 poo emojis that fills depending on the player score */}
              <ul className="flex flex-wrap col-span-3">
                {Array.from({ length: playerScore || 0}, (_, i) => (
                  <li key={i}>
                    <IconStar
                      className='w-6 h-6 fill-yellow-300'
                    />
                  </li>
                ))}
              </ul>

              <Avatar src={player.image!} name={player.name!} showFallback />
              <p className="text-slate-900 text-ellipsis">
                {player.name?.split(' ')[0]}
              </p>
              {isActive && player.id !== playerId && (
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
        <>
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-center">
            <Button
              className="bg-white border-2 border-slate-700"
              onClick={() => setActiveCardIndex(activeCardIndex - 1)}
            >
              Carta anterior
            </Button>
            <h2 className="text-center">{`${
              activeCardIndex + 1
            } / ${cardsCount}`}</h2>
            <Button
              className="bg-white border-2 border-slate-700"
              onClick={() => setActiveCardIndex(activeCardIndex + 1)}
            >
              Carta siguiente
            </Button>
          </section>
          <section className="grid grid-cols-2 w-full mb-4 items-center">
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
              <>
                <h2>
                  {voteState.bulbedPlayers.length +
                    voteState.pooedPlayers.length}{' '}
                  / {players.length - 1} votos
                </h2>
                <Button
                  className="bg-white border-2 border-slate-700"
                  onClick={resetGame}
                >
                  Reset
                </Button>
              </>
            )}
          </section>
        </>
      )}
      {isActive && (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {card?.ShittyQuestions.map((question) => (
            <ShittyQuestion
              key={question.id}
              question={question.question!}
              category={question.category}
            />
          ))}
        </section>
      )}
    </>
  );
}
