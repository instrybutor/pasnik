export function FullscreenSpinner() {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <span role="img" aria-label="food" className="text-6xl animate-bounce">
        🍔
      </span>
    </div>
  );
}
