import React, { useEffect } from 'react';
import Modal from './Modal';
import OnKeyboard from './OnKeyboard';
import Table from './Table';

const Game = ({
  letters,
  colors,
  enterWord,
  addLetter,
  deleteLetter,
  keyboard,
  bThemes,
  highlightBoard,
  resetGame,
  targetWord,
  gameState,
}) => {

  
  return (
    <div>
      <Table letters={letters} colors={colors} />
      <OnKeyboard
        enterWord={enterWord}
        addLetter={addLetter}
        deleteLetter={deleteLetter}
        keyboard={keyboard}
        bThemes={bThemes}
        highlightBoard={highlightBoard}
      />
      <Modal
        resetGame={resetGame}
        targetWord={targetWord}
        gameState={gameState}
      />
    </div>
  );
};

export default Game;
