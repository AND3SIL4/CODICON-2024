import { useState } from 'react';
import { Container } from './Container';

export const Carousel = ({ texts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === texts.length - 1 ? 0 : prevIndex + 1
    );
    if (currentIndex === texts.length - 1) {
      window.location.href = '/selection';
    }
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? texts.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <Container>
        {texts.map((text, index) => (
          <h2
            key={index}
            className={`mx-10 text-center text-2xl font-bold ${
              index === currentIndex ? '' : 'hidden'
            }`}
          >
            {text}
          </h2>
        ))}
      </Container>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {texts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full mb-4 ${
              index === currentIndex ? 'bg-purple-600/80' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <button
        onClick={goToNextSlide}
        className="absolute bottom-2 right-2 px-4 py-2 rounded-full"
      >
        <img
          src="../../public/icons/btn_info.svg"
          alt="Imagen de botón"
          title="Imagen de botón"
          width="50"
        />
      </button>
    </div>
  );
};
