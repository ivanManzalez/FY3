const getPlayerIds = (listOfPlayers) => {
  const playerIDs = {};
  listOfPlayers.forEach((player) => {
    playerIDs[player.id] = "";
  });
  return playerIDs;
};

export {getPlayerIds};