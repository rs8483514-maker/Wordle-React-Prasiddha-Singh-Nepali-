import React from 'react'

export default function ResultModal({ status, solution, onRestart }) {
  if (status === 'IN_PROGRESS') return null
  const won = status === 'WON'
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="result-title">
        <div className="result-icon">{won ? '🎉' : '💡'}</div>
        <h2 id="result-title">{won ? 'Brilliant!' : 'Nice try!'}</h2>
        <p>{won ? 'You guessed the word.' : 'The word was:'}</p>
        <div className="solution">{solution}</div>
        <button className="restart-button" onClick={onRestart}>Play again</button>
      </section>
    </div>
  )
}
