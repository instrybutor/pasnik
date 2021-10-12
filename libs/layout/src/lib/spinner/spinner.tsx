export function Spinner() {
  return (
    <div className="absolute h-full w-full flex flex-col gap-2 items-center justify-center bg-white">
      <span role="img" aria-label="food" className="text-6xl animate-bounce">
        🍔
      </span>
    </div>
  );
}

export default Spinner;
