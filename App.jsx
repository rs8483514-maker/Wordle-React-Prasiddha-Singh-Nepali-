
import React, { useState, useEffect, useCallback } from "react";

import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import ResultModal from "./components/ResultModal";

import {
  WORD_BANK,
  VALID_WORDS,
  getRandomCategory,
  getRandomEntry
} from "./words";

import { evaluateGuess, getKeyboardStatuses } from "./gameLogic";

const EMPTY = "     ";

export default function App() {

  const [category, setCategory] = useState(getRandomCategory);
  const [entry, setEntry] = useState(() => getRandomEntry(category));

  const [solutionWord, setSolutionWord] = useState(entry.word);
  const [currentGuess, setCurrentGuess] = useState(EMPTY);

  const [cursorIndex, setCursorIndex] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");
  const [message, setMessage] = useState("");

  const keyboardStatuses = getKeyboardStatuses(
    pastGuesses,
    solutionWord
  );

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 1600);
  };

  // INSERT LETTER INTO SELECTED TILE
  const handleKey = useCallback((key) => {

    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "BACKSPACE") {

      const chars = currentGuess.split("");

      let position = cursorIndex;

      if (chars[position] === " " && position > 0) {
        position--;
      }

      chars[position] = " ";

      setCurrentGuess(chars.join(""));
      setCursorIndex(position);

      return;
    }

    if (key === "ENTER") {

      const guess = currentGuess.replaceAll(" ", "");

      if (guess.length !== 5) {
        showMessage("Fill all 5 tiles!");
        return;
      }

      if (!VALID_WORDS.has(guess)) {
        showMessage("Word not in dictionary!");
        return;
      }

      const result = evaluateGuess(
        guess,
        solutionWord
      );

      const updatedGuesses = [
        ...pastGuesses,
        guess
      ];

      setPastGuesses(updatedGuesses);

      setEvaluations(previous => [
        ...previous,
        result
      ]);

      setCurrentGuess(EMPTY);
      setCursorIndex(0);

      if (guess === solutionWord) {
        setGameStatus("WON");
      }

      else if (updatedGuesses.length === 6) {
        setGameStatus("LOST");
      }

      return;
    }

    if (/^[a-z]$/i.test(key)) {

      const chars = currentGuess.split("");

      const position = cursorIndex;

      chars[position] = key.toUpperCase();

      setCurrentGuess(chars.join(""));

      // Move to the next empty tile.
      const nextEmpty = chars.findIndex(
        (letter, index) => index > position && letter === " "
      );

      if (nextEmpty !== -1) {
        setCursorIndex(nextEmpty);
      } else {
        setCursorIndex(4);
      }
    }

  }, [
    currentGuess,
    cursorIndex,
    gameStatus,
    pastGuesses,
    solutionWord
  ]);

  // PHYSICAL KEYBOARD SUPPORT
  useEffect(() => {

    const handlePhysicalKey = (event) => {

      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) return;

      if (event.key === "Enter") {
        event.preventDefault();
        handleKey("ENTER");
      }

      else if (event.key === "Backspace") {
        event.preventDefault();
        handleKey("BACKSPACE");
      }

      else if (/^[a-z]$/i.test(event.key)) {
        handleKey(event.key);
      }
    };

    window.addEventListener(
      "keydown",
      handlePhysicalKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handlePhysicalKey
      );
    };

  }, [handleKey]);

  // START NEW GAME
  const startNewGame = (newCategory = category) => {

    const newEntry = getRandomEntry(newCategory);

    setCategory(newCategory);
    setEntry(newEntry);
    setSolutionWord(newEntry.word);

    setCurrentGuess(EMPTY);
    setCursorIndex(0);

    setPastGuesses([]);
    setEvaluations([]);

    setGameStatus("IN_PROGRESS");
    setMessage("");
  };

  // CHANGE CATEGORY
  const changeCategory = (event) => {
    startNewGame(event.target.value);
  };

  return (

    <main className="app-shell">

      <header className="header">

        <div className="header-side">
          <span className="mini-mark">W</span>
        </div>

        <h1>WORDLE</h1>

        <div className="header-side right">
          <span className="daily-label">
            WORD CLUE CHALLENGE
          </span>
        </div>

      </header>

      <div className="game-content">

        <p className="instructions">
          Guess the hidden five-letter word in 6 tries!
        </p>

        {/* CATEGORY SELECTOR */}

        <section className="clue-panel">

          <label htmlFor="category">
            SELECT CATEGORY
          </label>

          <select
            id="category"
            value={category}
            onChange={changeCategory}
          >

            {Object.keys(WORD_BANK).map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}

          </select>

          {/* HINT DISPLAY */}

          <div className="hint">

            <span className="hint-icon">💡</span>

            <div>

              <strong>YOUR HINT</strong>

              <p>{entry.hint}</p>

            </div>

          </div>

        </section>

        {/* GAME GRID */}

        <GameBoard
          guesses={pastGuesses}
          currentGuess={currentGuess}
          evaluations={evaluations}
          cursorIndex={cursorIndex}
          onTileClick={setCursorIndex}
        />

        {/* NOTIFICATION */}

        <div className="message-slot">
          {message && (
            <div className="toast">
              {message}
            </div>
          )}
        </div>

        {/* VIRTUAL KEYBOARD */}

        <Keyboard
          onKey={handleKey}
          statuses={keyboardStatuses}
          disabled={gameStatus !== "IN_PROGRESS"}
        />

        <p className="mouse-tip">
          🖱 Click any tile to choose where your letter goes.
        </p>

        <button
          className="new-game-link"
          onClick={() => startNewGame()}
        >
          ↻ New Game
        </button>

      </div>

      <footer>
        Choose a category · Read the hint · Guess the word
      </footer>

      {/* GAME OVER POPUP */}

      <ResultModal
        status={gameStatus}
        solution={solutionWord}
        onRestart={() => startNewGame()}
      />

    </main>
  );
}
