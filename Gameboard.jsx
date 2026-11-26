
import React from "react";
import Row from "./Row";

export default function GameBoard({
  guesses,
  currentGuess,
  evaluations,
  cursorIndex,
  onTileClick
}) {
  return (
    <div className="board">
      {Array.from({ length: 6 }, (_, index) => {
        const isCurrent = index === guesses.length;

        return (
          <Row
            key={index}
            guess={
              guesses[index] ||
              (isCurrent ? currentGuess : "")
            }
            evaluation={evaluations[index] || []}
            isCurrent={isCurrent}
            cursorIndex={cursorIndex}
            onTileClick={onTileClick}
          />
        );
      })}
    </div>
  );
}
