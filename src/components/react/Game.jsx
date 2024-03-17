import { useState, useEffect } from 'react';
import { QuestionCard } from './QuestionCard';
import { GameOver } from './Congrats'; // Corregir la importación

export function Game() {
  // Estado para el juego
  const [isGameOver, setIsGameOver] = useState(
    JSON.parse(localStorage.getItem('isGameOver'))
  );
  const [isPast, setIsPast] = useState(
    JSON.parse(localStorage.getItem('isPast'))
  );

  return (
    <>
      {!isGameOver ? (
        <QuestionCard isPast={isPast} setIsGameOver={setIsGameOver} />
      ) : (
        <GameOver isPast={isPast} gameOver={isGameOver} />
      )}
    </>
  );
}
