import { useState } from 'react';

import { Badge } from './Badge';
import './styles/congrats.css';

export function GameOver() {
  // Estado para el juego
  const [gameOver, setIsGameOver] = useState(
    JSON.parse(localStorage.getItem('isGameOver'))
  );
  const [isPast, setIsPast] = useState(
    JSON.parse(localStorage.getItem('isPast'))
  );
  return (
    <div
      id="container"
      className={`${gameOver ? 'bg-custom_purple' : ''} ${
        isPast ? 'bg-custom_purple' : 'bg-custom_light_green'
      } w-[700px] py-4 px-8 rounded-xl h-[430px] border-2 border-black shadow-xl shadow-black`}
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <Badge title={isPast ? 'Pasado' : 'Futuro'} />
      {gameOver ? (
        <>
          <img
            id="character"
            src="/characters/failed.svg"
            alt="Imagen del personaje fallido"
            width="230"
            style={{ position: 'absolute', top: '-70px', right: '230px' }}
          />
          <div className="mt-24">
            <h1 className="text-2xl text-center font-bold mx-12 mt-12">
              ¡Lo sentimos! <br />
              Has fallado esta vez, ¡el virus se ha transmitido sin control!
            </h1>
            <p className="m-3 text-lg text-center">
              La humanidad cuenta sus últimos días.
            </p>
          </div>
        </>
      ) : (
        <>
          <img
            id="character"
            src={isPast ? '/characters/past.svg' : '/characters/future.svg'}
            alt={`Imagen personaje de ${isPast ? 'Pasado' : 'Futuro'}`}
            width="230"
            style={{ position: 'absolute', top: '-70px', right: '230px' }}
          />
          <div className="mt-20">
            <h1 className="text-2xl text-center font-bold mx-12 mt-12">
              ¡Felicidades! <br /> Sabíamos que podíamos contar contigo,{' '}
              {isPast
                ? '¡has evitado que el virus se propague!'
                : '¡has encontrado el antídoto!'}
            </h1>
            <p className="m-3 text-lg text-center">
              La humanidad se ha salvado de una pandemia y ahora el mundo puede
              seguir su curso con normalidad.
            </p>
          </div>
        </>
      )}
      <a
        className="ml-auto active:scale-90 duration-100 transition-all"
        href="/"
      >
        <img
          src="/icons/btn_home.svg"
          alt="Botón de inicio"
          title="Botón de inicio"
          width="50"
        />
      </a>
    </div>
  );
}
