type UseVoteProps = {
  roomId: string;
  setVoteState: (answers: {
    pooedPlayers: string[];
    bulbedPlayers: string[];
  }) => void;
  voteState: { pooedPlayers: string[]; bulbedPlayers: string[] };
  setPlayersAnswers: (
    roomId: string,
    answers: { pooedPlayers: string[]; bulbedPlayers: string[] }
  ) => void;
};
export const useVote = (props: UseVoteProps) => {
  const { roomId, setVoteState, voteState, setPlayersAnswers } = props;
  return (type: 'poo' | 'bulb', votedPlayerId: string, status: boolean) => {
    let newVoteState = { ...voteState };
    if (type === 'poo') {
      if (status) {
        newVoteState = {
          ...voteState,
          pooedPlayers: voteState.pooedPlayers.filter(
            (id) => id !== votedPlayerId
          ),
        };
      } else {
        newVoteState = {
          ...voteState,
          bulbedPlayers: voteState.bulbedPlayers.filter(
            (id) => id !== votedPlayerId
          ),
          pooedPlayers: [...voteState.pooedPlayers, votedPlayerId],
        };
      }
    } else {
      if (status) {
        newVoteState = {
          ...voteState,
          bulbedPlayers: voteState.bulbedPlayers.filter(
            (id) => id !== votedPlayerId
          ),
        };
      } else {
        newVoteState = {
          ...voteState,
          pooedPlayers: voteState.pooedPlayers.filter(
            (id) => id !== votedPlayerId
          ),
          bulbedPlayers: [...voteState.bulbedPlayers, votedPlayerId],
        };
      }
    }
    setVoteState(newVoteState);
    setPlayersAnswers(roomId, newVoteState);
  };
};
