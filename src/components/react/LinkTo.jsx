import { changeState } from '../../store';
// Function in order to catch the tense (future, past)
export function LinkTo({ url, isPast }) {
  function handleClick() {
    changeState(isPast);
    localStorage.setItem('isPast', isPast);
    window.location.href = '/rules';
  }

  return (
    <button
      onClick={handleClick}
      className="hover:scale-105 transition-all duration-300"
    >
      <img
        src={url}
        title="Imagen de pasado"
        alt="Imagen de pasado"
        width="300"
      />
    </button>
  );
}
