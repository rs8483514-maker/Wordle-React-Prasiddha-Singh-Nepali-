
import React from "react";

export default function Tile({
  letter,
  status,
  selected,
  onClick
}) {
  return (
    <button
      className={`tile ${status || ""} ${selected ? "selected" : ""} ${letter ? "filled" : ""}`}
      onClick={onClick}
      type="button"
    >
      {letter || ""}
    </button>
  );
}
