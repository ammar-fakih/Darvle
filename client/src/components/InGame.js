import React, { useState, useEffect } from 'react';
import socket from '../utilities/socketConnection';
import Lobby from './Lobby';
import Cookies from 'js-cookie';
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
  setGameState,
  playerNames,
  setPlayerNames,
}) => {
  console.log('currentPIN: ', currentPIN);

  useEffect(() => {
    changePIN(match.params.pin);
  }, []);
  useEffect(() => {
    socket.on('gameInfo', (data) => {
      setGameState(data.gameState);
      setPlayerNames(data.playerNames);
    });
  }, [currentPIN]);
  if (gameState === 'lobby') {
    return (
      <React.Fragment>
        <Lobby playerNames={playerNames} currentPIN={currentPIN} />
      </React.Fragment>
    );
  }
  return <div>ingame, pin: {currentPIN}</div>;
};

export default InGame;
