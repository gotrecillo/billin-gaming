type UseIncrementScoresProps = {
  setScore: (score: { userId: string; score: number }[]) => void;
  setActivePlayerState: (userId: string) => void;
  resetGame: () => void;
  score: { userId: string; score: number }[];
  voteState: { pooedPlayers: string[]; bulbedPlayers: string[] };
};
export const useIncrementScores = (props: UseIncrementScoresProps) => {
  const { setScore, setActivePlayerState, resetGame, score, voteState } = props;

  return (winners: 'poo' | 'bulb') => {
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
    setActivePlayerState('');
    resetGame();
  };
};
