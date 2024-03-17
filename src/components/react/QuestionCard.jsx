import { FillHeart, UnfilledHeart } from './Heart'; // Corregir nombre de componentes
import { useState, useEffect } from 'react';
import { Container } from './Container';
import { Badge } from './Badge';
import axios from 'axios';

const apiUrl = 'http://localhost:9000/api'; // Constante

const defaultOptions = [
  'Cargando respuesta...',
  'Cargando respuesta...',
  'Cargando respuesta...',
];

export const QuestionCard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // Tiempo en segundos
  const [fetchApiData, setFetchApiData] = useState(true);
  const [question, setQuestion] = useState('Cargando pregunta...');
  const [options, setOptions] = useState(defaultOptions);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1); // Índice de la pregunta actual
  const [counter, setCounter] = useState(3);

  const [isPast, setIsPast] = useState(
    JSON.parse(localStorage.getItem('isPast'))
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        isPast
          ? `${apiUrl}/past/${questionIndex}`
          : `${apiUrl}/future/${questionIndex}`
      );
      setQuestion(response.data.pregunta.toUpperCase());
      setOptions(response.data.opciones);
      setIsCorrect(response.data.respuesta);
    } catch (error) {
      console.error('Error al obtener datos de la pregunta:', error);
    }
  };

  useEffect(() => {
    if (fetchApiData) {
      fetchData();
      setFetchApiData(false); // Corregir lógica de actualización de estado
    }

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Lógica para manejar el tiempo agotado
        alert('¡Tiempo agotado!');
        window.location.href = '/';
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPast, timeLeft, fetchApiData]); // Corregir dependencias del efecto

  fetchData();

  /// Logica para manejar la seleccion de preguntas
  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Selecciona el usuario

    // Incrementar el índice de la pregunta y actualizar estado de vidas
    if (questionIndex < 10) {
      if (option !== isCorrect) {
        setCounter((prevCounter) => Math.max(prevCounter - 1, 0)); // Ensure counter doesn't go below
      }

      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
      }, 300);
    } else {
      // Jugador gana la partida
      localStorage.setItem('isGameOver', false);
      window.location.href = '/results';
    }
  };

  // Verificar si el jugador ha perdido la partida cuando el contador cambia
  useEffect(() => {
    if (counter === 0) {
      // Jugador pierde la partida
      alert('¡Game Over!');
      localStorage.setItem('isGameOver', true);
      window.location.href = '/results';
    }
  }, [counter]);

  return (
    <Container isPast={isPast}>
      <div className="flex justify-between items-center">
        <span className="text-zinc-800">Pregunta {questionIndex} de 10 </span>
        <div className="flex gap-3">
          {[...Array(counter)].map((_, index) => (
            <FillHeart key={index} />
          ))}
          {[...Array(3 - counter)].map((_, index) => (
            <UnfilledHeart key={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col gap-3 mb-4">
        <span className="text-black px-2 py-1 rounded-md flex gap-3">
          <span>
            <img src="/icons/clock.svg" alt="Reloj" />{' '}
            {/* Corregir ruta de imagen */}
          </span>
          {`${timeLeft}s`}
        </span>
        <Badge title={isPast ? 'Pasado' : 'Futuro'}></Badge>
      </div>
      <h2 className="text-lg text-center font-semibold mb-3">{question}</h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-2 px-4 rounded-md border border-black font-bold  ${
              selectedOption === option && isCorrect === option
                ? 'bg-green-600 text-white'
                : selectedOption === option && isCorrect !== option
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-green-100 hover:text-black'
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>
    </Container>
  );
};
