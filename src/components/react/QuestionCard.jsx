import { useState, useEffect } from 'react';
import { Badge } from './Badge';
import axios from 'axios';
import { Container } from './Container';
import { FillHart, UnFilledHeart } from './Heart';

const url = 'http://localhost:9000/api';
const opcionesDefault = [
  'No hay respuestas disponibles',
  'No hay respuestas disponibles',
  'No hay respuestas disponibles',
];
const QuestionCard = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // Tiempo en segundos
  const [fetchApiData, setFetchApiData] = useState(true);
  const [question, setQuestion] = useState('No hay preguntas disponibles');
  const [options, setOptions] = useState(opcionesDefault);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1); // Índice de la pregunta actual
  const [counter, setCounter] = useState(3);

  let isPast = localStorage.getItem('isPast');
  isPast = JSON.parse(isPast);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        isPast
          ? `${url}/past/${questionIndex}`
          : `${url}/future/${questionIndex}`
      );
      setQuestion(response.data.pregunta.toUpperCase());
      setOptions(response.data.opciones);
      setIsCorrect(response.data.respuesta);
    } catch (error) {
      console.error('Error fetching question data:', error);
    }
  };

  useEffect(() => {
    if (fetchApiData) {
      fetchData();
      setFetchApiData(!fetchApiData);
    }

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Lógica para manejar el tiempo agotado
        alert('Tiempo agotado');
        window.location.href = '/';
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPast, timeLeft]);

  // Logica para manejar la seleccion de preguntas
  const handleOptionSelect = (option) => {
    // TODO: ARREGLAR BUG PRIMERA PREGUNTA
    setSelectedOption(option); // Selecciona el usuario

    // Incrementar el índice de la pregunta
    if (questionIndex < 10) {
      // logica para restar puntuacion
      if (option !== isCorrect) {
        console.log(counter);
        setCounter(counter - 1);
      }

      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        fetchData();
        if (counter === 1) {
          alert('Game over');
          // todo redirection
        } else {
          alert('Winner');
        }
      }, 300);
    } else {
      alert('El juego se acabó y se debe mostrar si ganó o perdió');
    }
  };

  return (
    <Container isPast={isPast}>
      <div className="flex justify-between items-center">
        <span className="text-zinc-800">Pregunta {questionIndex} de 10 </span>
        {counter === 3 ? (
          <ContenedorHeart className="flex gap-3 text-custom_light_green">
            <FillHart />
            <FillHart />
            <FillHart />
          </ContenedorHeart>
        ) : counter === 2 ? (
          <ContenedorHeart className="flex gap-3 text-custom_light_green">
            <UnFilledHeart />
            <FillHart />
            <FillHart />
          </ContenedorHeart>
        ) : counter === 1 ? (
          <ContenedorHeart className="flex gap-3 text-custom_light_green">
            <UnFilledHeart />
            <UnFilledHeart />
            <FillHart />
          </ContenedorHeart>
        ) : (
          <ContenedorHeart className="flex gap-3 text-custom_light_green">
            <UnFilledHeart />
            <UnFilledHeart />
            <UnFilledHeart />
          </ContenedorHeart>
        )}
      </div>
      <div className="flex justify-center items-center flex-col gap-3 mb-4">
        <span className="text-black px-2 py-1 rounded-md flex gap-3">
          <span>
            <img src="../../../public/icons/clock.svg" alt="Reloj" />
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

export default QuestionCard;

function ContenedorHeart({ isPast, children }) {
  return (
    <span
      className={`flex gap-3 ${
        !isPast ? 'text-custom_light_green' : 'text-custom_purple'
      }`}
    >
      {children}
    </span>
  );
}
