import React, { useEffect, useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { Router, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from './Header';
import Footer from './Footer';
import history from '../utilities/history';
import { bigdick, smalldick } from '../info/Script';
import TitleScreen from './TitleScreen';
import JoinGame from './JoinGame';
import InGame from './InGame';

const App = () => {
  const [letters, setLetters] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [colors, setBColors] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [targetWord, setTargetWord] = useState('phold');
  const [gameState, setGameState] = useState('menu');
  const [guessedWord, setGuessedWord] = useState(0);
  const [guessedLetter, setGuessedLetter] = useState(0);
  const [bigDick, setBigDick] = useState([]);
  const [smallDick, setSmallDick] = useState([]);
  const [buttonAttributes, setButtonAttributes] = useState([]);
  const [bThemes, setBThemes] = useState([]);
  const [currentPIN, setCurrentPIN] = useState('');
  const [playerNames, setPlayerNames] = useState([]);

  // const componentDidMount = () => {
  // processDicks();
  // let bThemesCopy = [];
  // for (var bi = 0; bi < 26; ++bi) {
  //   let c = String.fromCharCode('a'.charCodeAt(0) + bi);
  //   bThemesCopy.push({ class: 'nothing', buttons: c });
  // }
  // this.setState({ bThemes: bThemesCopy });
  // };

  useEffect(() => {
  }, []);

  const resetGame = () => {
    let bThemesCopy = [];

    for (var bi = 0; bi < 26; ++bi) {
      let c = String.fromCharCode('a'.charCodeAt(0) + bi);
      bThemesCopy.push({ class: 'nothing', buttons: c });
    }

    var index = Math.floor(Math.random() * smallDick.length);
    console.log(smallDick[index]);

    setLetters([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ]);
    setBColors([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ]);
    setGuessedLetters([]);
    setGameState('running');
    setGuessedWord(0);
    setGuessedLetter(0);
    setButtonAttributes([]);
    setBThemes(bThemesCopy);
    setTargetWord(smallDick[index]);
  };

  const enterWord = () => {
    // console.log('enter was pressed');

    if (guessedLetter !== 5) {
      // pop up with "Enter 5 letters"
      return;
    }

    // create guessed word
    let word = letters[guessedWord].join('');

    if (bigDick.indexOf(word) === -1) {
      return;
    }

    setColors(word);

    // win condition
    if (word === targetWord) {
      // window.alert('Fuck You!!!!! YOU WIN!!!');

      setGameState('won');
      return;
    }

    // game loss
    if (guessedWord === 5) {
      // window.alert(`The word was ${targetWord}`);

      setGameState('lost');
      return;
    }

    // increment guessed word, reset guessed letter
    setGuessedWord(guessedWord + 1);
    setGuessedLetter(0);
  };

  const setColors = (word) => {
    let colorCopy = colors;
    let remaining = new Array(26).fill(0);
    let a = 'a'.charCodeAt(0);

    // remaining letters freq map
    for (var i = 0; i < 5; ++i) {
      remaining[targetWord.charCodeAt(i) - a] += 1;
    }

    // bthemes state copy
    let bth = bThemes;

    for (var j = 0; j < 5; ++j) {
      // set default colors
      colorCopy[guessedWord][j] = 'r';
      bth[word.charCodeAt(j) - a].class = 'n-letter';

      // green
      if (word.charAt(j) === targetWord.charAt(j)) {
        colorCopy[guessedWord][j] = 'g';
        remaining[word.charCodeAt(j) - a] -= 1;
        bth[word.charCodeAt(j) - a].class = 'g-letter';
      }
    }

    // yellow
    for (var k = 0; k < 5; ++k) {
      if (remaining[word.charCodeAt(k) - a] > 0) {
        colorCopy[guessedWord][k] = 'y';
        remaining[word.charCodeAt(k) - a] -= 1;
        bth[word.charCodeAt(k) - a].class = 'y-letter';
      }
    }

    this.setState({});
  };

  const addLetter = (value) => {
    // console.log(value, ' was pressed');

    if (guessedLetter > 4) {
      return;
    }

    let gameStateCopy = letters;
    gameStateCopy[guessedWord][guessedLetter] = value;

    this.setState({
      guessedLetter: guessedLetter + 1,
    });
  };

  const deleteLetter = () => {
    // console.log('backspace was pressed');

    if (guessedLetter === 0) {
      return;
    }

    let gameStateCopy = letters;
    gameStateCopy[guessedWord][guessedLetter - 1] = '';

    setGuessedLetter(guessedLetter - 1);
  };

  const processDicks = () => {
    var index = Math.floor(Math.random() * smalldick.length);

    setBigDick(bigdick + smalldick);
    setSmallDick(smalldick);
    setTargetWord(smalldick[index]);
    console.log(smalldick[index]);
  };

  return (
    <div>
      <KeyboardEventHandler
        handleKeys={['alphabetic', 'enter', 'backspace']}
        onKeyEvent={(key) => {
          if (gameState === 'running') {
            if (key === 'enter') {
              enterWord();
            } else if (key === 'backspace') {
              deleteLetter();
            } else {
              addLetter(key);
            }
          }
        }}
      />
      <Router history={history}>
        <Route path="/" render={() => <Header />} />
        <Switch>
          <Route
            path={['/', '/Davmardle']}
            exact
            render={() => <TitleScreen />}
          />
          {/* <Route
              path="/game"
              render={() => (
                <Game
                  letters={letters}
                  colors={colors}
                  enterWord={this.enterWord}
                  addLetter={this.addLetter}
                  deleteLetter={this.deleteLetter}
                  keyboard={keyboard}
                  bThemes={bThemes}
                  highlightBoard={gameState === 'running'}
                  resetGame={this.resetGame}
                  targetWord={targetWord}
                  gameState={gameState}
                />
              )}
            /> */}
          <Route
            path="/join"
            exact
            render={() => <JoinGame changePIN={setCurrentPIN} />}
          />
          <Route
            path="/game/:pin"
            exact
            render={({ match }) => (
              <InGame
                currentPIN={currentPIN}
                changePIN={setCurrentPIN}
                letters={letters}
                colors={colors}
                enterWord={enterWord}
                addLetter={addLetter}
                deleteLetter={deleteLetter}
                bThemes={bThemes}
                highlightBoard={gameState === 'running'}
                resetGame={resetGame}
                targetWord={targetWord}
                gameState={gameState}
                setGameState={setGameState}
                match={match}
                playerNames={playerNames}
                setPlayerNames={setPlayerNames}
              />
            )}
          />
        </Switch>
        <Route path="/" render={() => <Footer />} />
      </Router>
      {/* <button onClick={createCookie}>create cookie</button>
        <button onClick={getCookie}>get cookie</button> */}
    </div>
  );
};
export default App;

// class App extends React.Component {
//   static propTypes = {
//     cookies: instanceOf(Cookies).isRequired,
//   };

//   constructor(props) {
//     super(props);

//     const { cookies } = props;
//     this.state = {
//       name: cookies.get('name') || 'Ben',
//     };
//   }

//   handleNameChange(name) {
//     const { cookies } = this.props;

//     cookies.set('name', name, { path: '/' });
//     this.setState({ name });
//   }
//   // letters: [
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   // ],
//   // colors: [
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   //   ['', '', '', '', ''],
//   // ],
//   // guessedLetters: [],
//   // targetWord: 'phold',
//   // gameState: 'menu', // running, menu, lobby, won, lost
//   // guessedWord: 0,
//   // guessedLetter: 0,
//   // bigDick: [],
//   // smallDick: [],
//   // buttonAttributes: [],
//   // bThemes: [],
//   // currentPIN: '',
//   // playerNames: [],

//   componentDidMount = () => {
//     // this.processDicks();
//     // let bThemesCopy = [];
//     // for (var bi = 0; bi < 26; ++bi) {
//     //   let c = String.fromCharCode('a'.charCodeAt(0) + bi);
//     //   bThemesCopy.push({ class: 'nothing', buttons: c });
//     // }
//     // this.setState({ bThemes: bThemesCopy });
//   };

//   // createCookie = () => {
//   //   const cookies = new Cookies();

//   //   cookies.set('myCat', 'Pacman', { path: '/' });
//   // };

//   // getCookie = () => {
//   //   const cookies = new Cookies();
//   //   console.log(cookies.get('mycat'));
//   // };

//   changePIN = (pin) => {
//     this.setState({ currentPIN: pin });
//   };

//   setGameState = (newGameState) => {
//     this.setState({ gameState: newGameState });
//   };

//   setPlayerNames = (playerNames) => {
//     this.setState({ playerNames: playerNames });
//   };

//   resetGame = async () => {
//     let bThemesCopy = [];

//     for (var bi = 0; bi < 26; ++bi) {
//       let c = String.fromCharCode('a'.charCodeAt(0) + bi);
//       bThemesCopy.push({ class: 'nothing', buttons: c });
//     }

//     var index = Math.floor(Math.random() * this.state.smallDick.length);
//     console.log(this.state.smallDick[index]);
//     this.setState({
//       letters: [
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//       ],
//       colors: [
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//         ['', '', '', '', ''],
//       ],
//       guessedLetters: [],
//       gameState: 'running',
//       guessedWord: 0,
//       guessedLetter: 0,
//       buttonAttributes: [],
//       bThemes: bThemesCopy,
//       targetWord: this.state.smallDick[index],
//     });
//   };

//   enterWord = () => {
//     // console.log('enter was pressed');

//     if (this.state.guessedLetter !== 5) {
//       // pop up with "Enter 5 letters"
//       return;
//     }

//     // create guessed word
//     let word = this.state.letters[this.state.guessedWord].join('');

//     if (this.state.bigDick.indexOf(word) === -1) {
//       return;
//     }

//     this.setColors(word);

//     // win condition
//     if (word === this.state.targetWord) {
//       // window.alert('Fuck You!!!!! YOU WIN!!!');

//       this.setState({ gameState: 'won' });
//       return;
//     }

//     // game loss
//     if (this.state.guessedWord === 5) {
//       // window.alert(`The word was ${this.state.targetWord}`);

//       this.setState({ gameState: 'lost' });
//       return;
//     }

//     // increment guessed word, reset guessed letter
//     this.setState({
//       guessedWord: this.state.guessedWord + 1,
//       guessedLetter: 0,
//     });
//   };

//   setColors = (word) => {
//     let colorCopy = this.state.colors;
//     let remaining = new Array(26).fill(0);
//     let a = 'a'.charCodeAt(0);

//     // remaining letters freq map
//     for (var i = 0; i < 5; ++i) {
//       remaining[this.state.targetWord.charCodeAt(i) - a] += 1;
//     }

//     // bthemes state copy
//     let bth = this.state.bThemes;

//     for (var j = 0; j < 5; ++j) {
//       // set default colors
//       colorCopy[this.state.guessedWord][j] = 'r';
//       bth[word.charCodeAt(j) - a].class = 'n-letter';

//       // green
//       if (word.charAt(j) === this.state.targetWord.charAt(j)) {
//         colorCopy[this.state.guessedWord][j] = 'g';
//         remaining[word.charCodeAt(j) - a] -= 1;
//         bth[word.charCodeAt(j) - a].class = 'g-letter';
//       }
//     }

//     // yellow
//     for (var k = 0; k < 5; ++k) {
//       if (remaining[word.charCodeAt(k) - a] > 0) {
//         colorCopy[this.state.guessedWord][k] = 'y';
//         remaining[word.charCodeAt(k) - a] -= 1;
//         bth[word.charCodeAt(k) - a].class = 'y-letter';
//       }
//     }

//     this.setState({});
//   };

//   addLetter = (value) => {
//     // console.log(value, ' was pressed');

//     if (this.state.guessedLetter > 4) {
//       return;
//     }

//     let gameStateCopy = this.state.letters;
//     gameStateCopy[this.state.guessedWord][this.state.guessedLetter] = value;

//     this.setState({
//       guessedLetter: this.state.guessedLetter + 1,
//     });
//   };

//   deleteLetter = () => {
//     // console.log('backspace was pressed');

//     if (this.state.guessedLetter === 0) {
//       return;
//     }

//     let gameStateCopy = this.state.letters;
//     gameStateCopy[this.state.guessedWord][this.state.guessedLetter - 1] = '';

//     this.setState({
//       guessedLetter: this.state.guessedLetter - 1,
//     });
//   };

//   processDicks = () => {
//     var index = Math.floor(Math.random() * smalldick.length);

//     this.setState({
//       bigDick: bigdick + smalldick,
//       smallDick: smalldick,
//       targetWord: smalldick[index],
//     });
//     console.log(smalldick[index]);
//   };

//   render() {
//     return (
//       <div>
//         <KeyboardEventHandler
//           handleKeys={['alphabetic', 'enter', 'backspace']}
//           onKeyEvent={(key) => {
//             if (this.state.gameState === 'running') {
//               if (key === 'enter') {
//                 this.enterWord();
//               } else if (key === 'backspace') {
//                 this.deleteLetter();
//               } else {
//                 this.addLetter(key);
//               }
//             }
//           }}
//         />
//         <Router history={history}>
//           <Route path="/" render={() => <Header />} />
//           <Switch>
//             <Route
//               path={['/', '/Davmardle']}
//               exact
//               render={() => <TitleScreen />}
//             />
//             {/* <Route
//               path="/game"
//               render={() => (
//                 <Game
//                   letters={this.state.letters}
//                   colors={this.state.colors}
//                   enterWord={this.enterWord}
//                   addLetter={this.addLetter}
//                   deleteLetter={this.deleteLetter}
//                   keyboard={this.state.keyboard}
//                   bThemes={this.state.bThemes}
//                   highlightBoard={this.state.gameState === 'running'}
//                   resetGame={this.resetGame}
//                   targetWord={this.state.targetWord}
//                   gameState={this.state.gameState}
//                 />
//               )}
//             /> */}
//             <Route
//               path="/join"
//               exact
//               render={() => <JoinGame changePIN={this.changePIN} />}
//             />
//             <Route
//               path="/game/:pin"
//               exact
//               render={({ match }) => (
//                 <InGame
//                   currentPIN={this.state.currentPIN}
//                   changePIN={this.changePIN}
//                   letters={this.state.letters}
//                   colors={this.state.colors}
//                   enterWord={this.enterWord}
//                   addLetter={this.addLetter}
//                   deleteLetter={this.deleteLetter}
//                   keyboard={this.state.keyboard}
//                   bThemes={this.state.bThemes}
//                   highlightBoard={this.state.gameState === 'running'}
//                   resetGame={this.resetGame}
//                   targetWord={this.state.targetWord}
//                   gameState={this.state.gameState}
//                   setGameState={this.setGameState}
//                   match={match}
//                   playerNames={this.state.playerNames}
//                   setPlayerNames={this.setPlayerNames}
//                 />
//               )}
//             />
//           </Switch>
//           <Route path="/" render={() => <Footer />} />
//         </Router>
//         {/* <button onClick={this.createCookie}>create cookie</button>
//         <button onClick={this.getCookie}>get cookie</button> */}
//       </div>
//     );
//   }
// }
