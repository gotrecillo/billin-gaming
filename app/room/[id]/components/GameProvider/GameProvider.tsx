'use client';
import { createContext, useState } from 'react';
import { User } from '@prisma/client';

import { setActivePlayer as setActivePlayerInServer } from '../../server-actions/set-active-player';
import { setPlayersAnswers } from '../../server-actions/set-players-answers';
import { incrementPlayersScore } from '../../server-actions/increment-players-score';
import { useSincronizeWithPusher } from './useSincronizeWithPusher';
import { useIncrementScores } from './useIncrementScores';
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
});

export default function GameProvider(props: GameProviderProps) {
  const {
    players,
    playerId,
    initialScore,
    roomId,
    initialActivePlayer,
    hasOwnerRights,
  } = props;
  const [score, setScore] = useState(initialScore);
  const [voteState, setVoteState] = useState<{
    pooedPlayers: string[];
    bulbedPlayers: string[];
  }>({ pooedPlayers: [], bulbedPlayers: [] });

  const [activePlayer, setActivePlayerState] =
    useState<string>(initialActivePlayer);

  const resetGame = () => {
    setVoteState({ pooedPlayers: [], bulbedPlayers: [] });
  };

  const incrementScores = useIncrementScores({
    resetGame,
    score,
    setActivePlayerState,
    setScore,
    voteState,
  });

  useSincronizeWithPusher({
    roomId,
    setVoteState,
    setActivePlayerState,
    incrementScores,
    resetGame,
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
  };

  return (
    <GameContext.Provider value={contextValues}>
      {props.children}
    </GameContext.Provider>
  );
}
