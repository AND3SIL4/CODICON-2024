export function Badge({ title }) {
  return (
    <span className="inline-block bg-gradient-to-r from-custom_gray/40 to-gray-300 px-3 py-1 w-20 rounded-lg bg-white/80 font-semibold border border-black">
      {title}
    </span>
  );
}
