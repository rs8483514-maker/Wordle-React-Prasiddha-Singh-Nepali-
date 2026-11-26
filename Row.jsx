
import React from "react";
import Tile from "./Tile";

export default function Row({
  guess,
  evaluation,
  isCurrent,
  cursorIndex,
  onTileClick
}) {
  return (
    <div className="row">
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          letter={guess[index] === " " ? "" : guess[index] || ""}
          status={evaluation[index] || ""}
          selected={isCurrent && cursorIndex === index}
          onClick={
            isCurrent
              ? () => onTileClick(index)
              : undefined
          }
        />
      ))}
    </div>
  );
}
