import React, { useState, useEffect, useMemo, useContext, useReducer, useCallback, useRef } from 'react';
import { randomWord } from '../../components/words/Words';
import './hangman.css';
import { useStats } from '../../contexts/statsContext/StatsContext'
import start from '../../assets/start.png';
import step1 from '../../assets/step1.png';
import step2 from '../../assets/step2.png';
import step3 from '../../assets/step3.png';
import step4 from '../../assets/step4.png';
import step5 from '../../assets/step5.png';
import end from '../../assets/end.png';

const mistakeReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_MISTAKES':
      return { ...state, mistakes: state.mistakes + 1 };
    case 'RESET_MISTAKES':
      return { ...state, mistakes: 0 };
    default:
      return state;
  }
};

const Hangman = () => {
  const maxWrong = {
    easy: 6,
    medium: 4,
    hard: 2
  };
  const images = [start, step1, step2, step3, step4, step5, end];
  const { wins, setWins, losses, setLosses } = useStats();
  const [guessed, setGuessed] = useState(new Set([]));
  const [answer, setAnswer] = useState('');
  const [currentLetter, setCurrentLetter] = useState('');
  const [usedLetters, setUsedLetters] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const resetButtonRef = useRef(null);
  const [mistakeState, dispatchMistake] = useReducer(mistakeReducer, { mistakes: 0 });

  const handleGuess = useCallback((letter) => {
    setGuessed((prevGuessed) => new Set(prevGuessed.add(letter)));

    if (answer.includes(letter)) {
      setCorrectGuesses((prevCorrectGuesses) => prevCorrectGuesses + 1);
    } else {
      dispatchMistake({ type: 'INCREMENT_MISTAKES' });
    }

    setUsedLetters((prevUsedLetters) => [...prevUsedLetters, letter]);
  }, [answer]);

  const guessedWord = useMemo(() => {
    return answer.split("").map((letter) => (guessed.has(letter) ? letter : " _ "));
  }, [answer, guessed]);

  const generateButtons = useCallback(() => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        className='keyboard'
        key={letter}
        value={letter}
        onClick={() => handleGuess(letter)}
        disabled={guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }, [handleGuess, guessed]);

  const resetButton = useCallback(() => {
    setGuessed(new Set([]));
    setAnswer(randomWord(difficulty));
    setUsedLetters([]);
    setCorrectGuesses(0);
    dispatchMistake({ type: 'RESET_MISTAKES' });
    
    if (resetButtonRef.current) {
      resetButtonRef.current.focus();
    }
  }, [difficulty]);

  useEffect(() => {
    const isWinner = guessedWord.join('') === answer;
    if (isWinner) {
      setWins((prevWins) => prevWins + 1);
    } else if (mistakeState.mistakes >= maxWrong[difficulty]) {
      setLosses((prevLosses) => prevLosses + 1);
    }
  }, [guessed]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const letter = event.key.toLowerCase();
      if (/^[a-z]$/.test(letter) && !guessed.has(letter)) {
        setCurrentLetter(letter);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessed]);

  useEffect(() => {
    if (currentLetter !== '') {
      handleGuess(currentLetter);
      setCurrentLetter('');
    }
  }, [currentLetter, handleGuess]);

  useEffect(() => {
    setAnswer(randomWord(difficulty));
  }, [difficulty]);

  const gameOver = mistakeState.mistakes >= maxWrong[difficulty];
  const isWinner = guessedWord.join("") === answer;
  let gameStat = generateButtons();

  if (isWinner) {
    const percentage = (correctGuesses / (correctGuesses + mistakeState.mistakes)) * 100;
    gameStat = `You Won!!! Correct Guesses: ${percentage.toFixed(2)}%`;
  }

  if (gameOver) {
    gameStat = "You Lost!!!";
  }

  const handleDifficultyChange = useCallback((event) => {
    setDifficulty(event.target.value);
  }, []);

  return (
    <div className="Hangman">
      <div className="Hangman__mistakes">
        <h3>Wrong Guesses: {mistakeState.mistakes} of {maxWrong[difficulty]}</h3>
      </div>
      <div className="Hangman__image">
        <img src={images[mistakeState.mistakes]} alt="" />
      </div>
      <div className="Hangman__word">
        <p>Guess the word:</p>
        <p>{!gameOver ? guessedWord : answer}</p>
      </div>
      <div className="Hangman__keyboard">
        <p>{gameStat}</p>
      </div>
      <div className="Hangman__used-letters">
        <p>Used Letters: {usedLetters.join(', ')}</p>
      </div>
      <div className="Hangman__reset">
        <button ref={resetButtonRef} onClick={resetButton}>Reset</button>
      </div>
      <div className="Hangman__difficulty">
        <label htmlFor="difficulty">Difficulty: </label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default Hangman;
