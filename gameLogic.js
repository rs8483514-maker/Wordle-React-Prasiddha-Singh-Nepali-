// Evaluate duplicate letters correctly using Wordle's two-pass approach.
export function evaluateGuess(guess, solution) {
  const result = Array(5).fill('absent')
  const remaining = solution.split('')

  // First pass: exact matches.
  for (let i = 0; i < 5; i += 1) {
    if (guess[i] === solution[i]) {
      result[i] = 'correct'
      remaining[i] = null
    }
  }

  // Second pass: letters present elsewhere, consuming each occurrence once.
  for (let i = 0; i < 5; i += 1) {
    if (result[i] === 'correct') continue
    const foundAt = remaining.indexOf(guess[i])
    if (foundAt !== -1) {
      result[i] = 'present'
      remaining[foundAt] = null
    }
  }
  return result
}

export function getKeyboardStatuses(guesses, solution) {
  const priority = { absent: 1, present: 2, correct: 3 }
  const statuses = {}
  guesses.forEach((guess) => {
    const evaluation = evaluateGuess(guess, solution)
    guess.split('').forEach((letter, index) => {
      const next = evaluation[index]
      if (!statuses[letter] || priority[next] > priority[statuses[letter]]) {
        statuses[letter] = next
      }
    })
  })
  return statuses
}
