'use client';
import { createContext, useState } from 'react';
import { ShittyQuestion, User } from '@prisma/client';

import { setActivePlayer as setActivePlayerInServer } from '../../server-actions/set-active-player';
import { setPlayersAnswers } from '../../server-actions/set-players-answers';
import { incrementPlayersScore } from '../../server-actions/increment-players-score';
import { resetScore } from '../../server-actions/reset-score';
import { useSincronizeWithPusher } from './useSincronizeWithPusher';
import { useIncrementScores } from './useIncrementScores';
import { setActiveCard } from '../../server-actions/set-active-card';
import { useVote } from './useVote';

type GameProviderProps = {
  roomId: string;
  players: User[];
  hasOwnerRights: boolean;
  initialActivePlayer: string;
  playerId: string;
  initialScore: {
    userId: string;
    score: number;
  }[];
  children: React.ReactNode;
  cards: { ShittyQuestions: ShittyQuestion[] }[];
};

type GameContextValues = {
  players: User[];
  voteState: {
    pooedPlayers: string[];
    bulbedPlayers: string[];
  };
  score: {
    userId: string;
    score: number;
  }[];
  activePlayer: string;
  playerId: string;
  vote: (type: 'poo' | 'bulb', votedPlayerId: string, status: boolean) => void;
  setActivePlayer: (newActivePlayerId: string) => void;
  sendResults: (winners: 'poo' | 'bulb') => void;
  isActive: boolean;
  hasOwnerRights: boolean;
  showSubmitButtons: boolean;
  resetGame: () => void;
  card: { ShittyQuestions: ShittyQuestion[] };
  cardsCount: number;
  activeCardIndex: number;
  setActiveCardIndex: (newActiveCardIndex: number) => void;
};

// create game provider context
export const GameContext = createContext<GameContextValues>({
  players: [],
  voteState: { pooedPlayers: [], bulbedPlayers: [] },
  score: [],
  activePlayer: '',
  playerId: '',
  vote: () => {},
  isActive: false,
  hasOwnerRights: false,
  showSubmitButtons: false,
  setActivePlayer: () => {},
  sendResults: () => {},
  resetGame: () => {},
  card: { ShittyQuestions: [] as ShittyQuestion[] },
  cardsCount: 0,
  activeCardIndex: 0,
  setActiveCardIndex: () => {},
});

export default function GameProvider(props: GameProviderProps) {
  const {
    players,
    playerId,
    initialScore,
    roomId,
    initialActivePlayer,
    hasOwnerRights,
    cards,
  } = props;
  const [score, setScore] = useState(initialScore);
  const [activeCardIndex, setActiveCardIndexState] = useState(0);
  const [voteState, setVoteState] = useState<{
    pooedPlayers: string[];
    bulbedPlayers: string[];
  }>({ pooedPlayers: [], bulbedPlayers: [] });

  const setActiveCardIndex = (newActiveCardIndex: number) => {
    let newIndex = newActiveCardIndex;
    if (newIndex < 0) {
      newIndex = cards.length - 1;
    }
    if (newIndex > cards.length - 1) {
      newIndex = 0;
    }
    setActiveCard(roomId, newIndex);
  };

  const [activePlayer, setActivePlayerState] =
    useState<string>(initialActivePlayer);

  const resetVotes = () => {
    setVoteState({ pooedPlayers: [], bulbedPlayers: [] });
  };

  const resetGame = () => {
    resetScore(roomId);
  };

  const incrementScores = useIncrementScores({
    resetVotes,
    score,
    setActivePlayerState,
    setScore,
    voteState,
  });

  const resetScores = () => setScore([]);

  useSincronizeWithPusher({
    setActiveCardIndex: setActiveCardIndexState,
    roomId,
    setVoteState,
    setActivePlayerState,
    incrementScores,
    resetVotes,
    resetScores,
  });

  const isActive = playerId === activePlayer;

  const showSubmitButtons =
    hasOwnerRights &&
    voteState.pooedPlayers.length + voteState.bulbedPlayers.length ===
      players.length - 1;
  const vote = useVote({
    roomId,
    voteState,
    setVoteState,
    setPlayersAnswers,
  });

  const sendResults = (winners: 'poo' | 'bulb') => {
    const chosenPlayers =
      winners === 'poo' ? voteState.pooedPlayers : voteState.bulbedPlayers;
    incrementPlayersScore(roomId, chosenPlayers, winners);
    setActiveCardIndex(activeCardIndex + 1);
  };

  const setActivePlayer = (newActivePlayerId: string) => {
    setActivePlayerState(newActivePlayerId);
    setActivePlayerInServer(roomId, newActivePlayerId);
  };

  const contextValues = {
    players,
    voteState,
    score,
    activePlayer,
    playerId,
    vote,
    isActive,
    hasOwnerRights,
    showSubmitButtons,
    sendResults,
    setActivePlayer,
    resetGame,
    card: cards[activeCardIndex],
    cardsCount: cards.length,
    activeCardIndex,
    setActiveCardIndex,
  };

  return (
    <GameContext.Provider value={contextValues}>
      {props.children}
    </GameContext.Provider>
  );
}
