import {} from 'react-router-dom';

// Function in order to catch the tense (future, past)
export function LinkTo({ url, isPast }) {
  function handleClick() {
    localStorage.setItem('isPast', isPast);
    window.location.href = '/game'
    return isPast;
  }

  return (
    <button onClick={handleClick}>
      <img
        src={url}
        title="Imagen de pasado"
        alt="Imagen de pasado"
        width="300"
      />
    </button>
  );
}
