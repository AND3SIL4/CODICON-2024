import { useState, useEffect } from 'react';
import { Badge } from './Badge';

export const QuestionCard = ({ question, options, isPast }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30); // Tiempo en segundos

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Lógica para manejar el tiempo agotado
        console.log('Tiempo agotado');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    alert(option);
  };

  return (
    <div
      className={`${
        isPast ? 'bg-custom_purple' : 'bg-custom_light_green'
      } shadow-md rounded-md p-6`}
    >
      <div className="flex justify-center items-center flex-col gap-3 mb-4">
        <span className="borde text-black px-2 py-1 rounded-md flex gap-3">
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
            className={`w-full py-2 px-4 rounded-md ${
              selectedOption === option
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-green-100 hover:text-black'
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
