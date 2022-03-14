import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import history from '../history';
import { bigdick, smalldick } from '../info/Script';
import Game from './Game';
import OnKeyboard from './OnKeyboard';
import Table from './Table';
import TitleScreen from './TitleScreen';
import JoinGame from './JoinGame';
// import papaparse from 'papaparse';

class App extends React.Component {
  state = {
    letters: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
    colors: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],
    guessedLetters: [],
    targetWord: 'phold',
    gameState: 'running',
    guessedWord: 0,
    guessedLetter: 0,
    bigDick: [],
    smallDick: [],
    buttonAttributes: [],
    bThemes: [],
  };

  componentDidMount = () => {
    this.processDicks();
    // this.setState({smallDick: dicts.smalldick, bigDick: dicts.bigdick})
    let bThemesCopy = [];

    for (var bi = 0; bi < 26; ++bi) {
      let c = String.fromCharCode('a'.charCodeAt(0) + bi);
      bThemesCopy.push({ class: 'nothing', buttons: c });
    }
    this.setState({ bThemes: bThemesCopy });
  };

  resetGame = async () => {
    let bThemesCopy = [];

    for (var bi = 0; bi < 26; ++bi) {
      let c = String.fromCharCode('a'.charCodeAt(0) + bi);
      bThemesCopy.push({ class: 'nothing', buttons: c });
    }

    var index = Math.floor(Math.random() * this.state.smallDick.length);
    console.log(this.state.smallDick[index]);
    this.setState({
      letters: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ],
      colors: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ],
      guessedLetters: [],
      gameState: 'running',
      guessedWord: 0,
      guessedLetter: 0,
      buttonAttributes: [],
      bThemes: bThemesCopy,
      targetWord: this.state.smallDick[index],
    });
  };

  enterWord = () => {
    // console.log('enter was pressed');

    if (this.state.guessedLetter !== 5) {
      // pop up with "Enter 5 letters"
      return;
    }

    // create guessed word
    let word = this.state.letters[this.state.guessedWord].join('');

    if (this.state.bigDick.indexOf(word) === -1) {
      return;
    }

    this.setColors(word);

    // win condition
    if (word === this.state.targetWord) {
      // window.alert('Fuck You!!!!! YOU WIN!!!');

      this.setState({ gameState: 'won' });
      return;
    }

    // game loss
    if (this.state.guessedWord === 5) {
      // window.alert(`The word was ${this.state.targetWord}`);

      this.setState({ gameState: 'lost' });
      return;
    }

    // increment guessed word, reset guessed letter
    this.setState({
      guessedWord: this.state.guessedWord + 1,
      guessedLetter: 0,
    });
  };

  setColors = (word) => {
    let colorCopy = this.state.colors;
    let remaining = new Array(26).fill(0);
    let a = 'a'.charCodeAt(0);

    // remaining letters freq map
    for (var i = 0; i < 5; ++i) {
      remaining[this.state.targetWord.charCodeAt(i) - a] += 1;
    }

    // bthemes state copy
    let bth = this.state.bThemes;

    for (var j = 0; j < 5; ++j) {
      // set default colors
      colorCopy[this.state.guessedWord][j] = 'r';
      bth[word.charCodeAt(j) - a].class = 'n-letter';

      // green
      if (word.charAt(j) === this.state.targetWord.charAt(j)) {
        colorCopy[this.state.guessedWord][j] = 'g';
        remaining[word.charCodeAt(j) - a] -= 1;
        bth[word.charCodeAt(j) - a].class = 'g-letter';
      }
    }

    // yellow
    for (var k = 0; k < 5; ++k) {
      if (remaining[word.charCodeAt(k) - a] > 0) {
        colorCopy[this.state.guessedWord][k] = 'y';
        remaining[word.charCodeAt(k) - a] -= 1;
        bth[word.charCodeAt(k) - a].class = 'y-letter';
      }
    }

    this.setState({});
  };

  addLetter = (value) => {
    // console.log(value, ' was pressed');

    if (this.state.guessedLetter > 4) {
      return;
    }

    let gameStateCopy = this.state.letters;
    gameStateCopy[this.state.guessedWord][this.state.guessedLetter] = value;

    this.setState({
      guessedLetter: this.state.guessedLetter + 1,
    });
  };

  deleteLetter = () => {
    // console.log('backspace was pressed');

    if (this.state.guessedLetter === 0) {
      return;
    }

    let gameStateCopy = this.state.letters;
    gameStateCopy[this.state.guessedWord][this.state.guessedLetter - 1] = '';

    this.setState({
      guessedLetter: this.state.guessedLetter - 1,
    });
  };

  processDicks = () => {
    var index = Math.floor(Math.random() * smalldick.length);

    this.setState({
      bigDick: bigdick + smalldick,
      smallDick: smalldick,
      targetWord: smalldick[index],
    });
    console.log(smalldick[index]);
  };

  render() {
    return (
      <div>
        <KeyboardEventHandler
          handleKeys={['alphabetic', 'enter', 'backspace']}
          onKeyEvent={(key) => {
            if (this.state.gameState === 'running') {
              if (key === 'enter') {
                this.enterWord();
              } else if (key === 'backspace') {
                this.deleteLetter();
              } else {
                this.addLetter(key);
              }
            }
          }}
        />
        <Router history={history}>
          <Route path="/" render={() => <Header />} />
          <Switch>
            <Route path="/" exact render={() => <TitleScreen />} />
            <Route
              path="/game"
              render={() => (
                <Game
                  letters={this.state.letters}
                  colors={this.state.colors}
                  enterWord={this.enterWord}
                  addLetter={this.addLetter}
                  deleteLetter={this.deleteLetter}
                  keyboard={this.state.keyboard}
                  bThemes={this.state.bThemes}
                  highlightBoard={this.state.gameState === 'running'}
                  resetGame={this.resetGame}
                  targetWord={this.state.targetWord}
                  gameState={this.state.gameState}
                />
              )}
            />
            <Route path="/join" exact render={() => <JoinGame />} />
          </Switch>
          <Route path="/" render={() => <Footer />} />
        </Router>
      </div>
    );
  }
}

export default App;
