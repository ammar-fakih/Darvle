class Lobby {
  /**
   *
   * @param gameState string: "lobby", "running", "end"
   * @param playerStates object: {playerID:
   *            {letters, colors,
   *            guessedLetters, guessedWord
   *            guessedLetter, buttonAttributes, bThemes, playerName}}} 
   * @param playerNames array
   * @param targetWords array
   */
  constructor(gameState, playerStates, playerNames, targetWords) {
    this.gameState = gameState;
    this.playerStates = playerStates;
    this.playerNames = playerNames;
    this.targetWords = targetWords;
  }
}

module.exports = Lobby;
