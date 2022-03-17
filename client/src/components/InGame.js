import React, { useState, useEffect } from 'react';
import socket from '../utilities/socketConnection';
import history from '../utilities/history';

const InGame = ({
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
  currentPIN,
  changePIN,
  match,
}) => {
  useEffect(() => {
    changePIN(match.params.pin);
  }, []);
  useEffect(() => {
    console.log(currentPIN);
  }, [currentPIN]);

  return <div>ingame, pin:</div>;
};

export default InGame;
