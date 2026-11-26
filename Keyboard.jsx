import React from 'react'

const KEYS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

export default function Keyboard({ onKey, statuses, disabled }) {
  return (
    <div className="keyboard" aria-label="On-screen keyboard">
      {KEYS.map((line, rowIndex) => (
        <div className="keyboard-row" key={line}>
          {rowIndex === 2 && (
            <button className="key key-wide" onClick={() => onKey('ENTER')} disabled={disabled}>ENTER</button>
          )}
          {line.split('').map((letter) => (
            <button
              key={letter}
              className={`key ${statuses[letter] || ''}`}
              onClick={() => onKey(letter)}
              disabled={disabled}
              aria-label={letter}
            >{letter}</button>
          ))}
          {rowIndex === 2 && (
            <button className="key key-wide backspace" onClick={() => onKey('BACKSPACE')} disabled={disabled} aria-label="Backspace">⌫</button>
          )}
        </div>
      ))}
    </div>
  )
}
