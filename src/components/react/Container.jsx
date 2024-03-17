export function Container({ children, isPast = true }) {
  return (
    <div
      id="container"
      className={`${
        isPast ? 'bg-custom_purple' : ' bg-custom_light_green'
      } rounded-xl px-8 py-12 w-[800px] h-[450px] shadow-xl hover:translate-y-3 transition-all duration-1000 hover:cursor-pointer shadow-black flex flex-col justify-center `}
    >
      {children}
    </div>
  );
}
