import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Lobby from './Lobby';
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
}) => {
  useEffect(() => {
    changePIN(match.params.pin);
  }, []);
  useEffect(() => {
    let socket = io(`localhost:9000/${currentPIN}`);
    socket.on('gameInfo', (data) => {
      console.log('data: ', data);
      setGameState(data.gameState);
    });
  }, [currentPIN]);
  if (gameState === 'lobby') {
    return (
      <React.Fragment>
        <Lobby currentPIN={currentPIN}/>
      </React.Fragment>
    );
  }
  return <div>ingame, pin: {currentPIN}</div>;
};

export default InGame;
