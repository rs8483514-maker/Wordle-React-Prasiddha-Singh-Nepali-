# Wordle React

A responsive Wordle-style five-letter guessing game built with React, Vite, and Node.js.

## Requirements
- Node.js 18 or newer
- npm (included with Node.js)

## Run locally
1. Extract `wordle-react.zip`.
2. Open Terminal and move into the project folder:
   ```bash
   cd wordle-react
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## How to play
- Enter letters using your physical keyboard or the on-screen keyboard.
- Press Enter to submit a five-letter word.
- Press Backspace to remove the last letter.
- Green means correct letter and position; yellow means the letter is in the word but in another position; gray means it is not in the word.
- You have six guesses. The game ends when you find the word or use all six rows.
- Use **New game** to start another round.

## Project structure
```text
wordle-react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── gameLogic.js
    ├── main.jsx
    ├── styles.css
    ├── words.js
    └── components/
        ├── GameBoard.jsx
        ├── Keyboard.jsx
        ├── ResultModal.jsx
        ├── Row.jsx
        └── Tile.jsx
```

## Notes
- The default target is selected deterministically by day from the bundled solution list.
- The bundled validation dictionary is intentionally compact and can be expanded in `src/words.js`.
- Duplicate-letter evaluation follows the standard two-pass Wordle rule.
