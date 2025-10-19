interface ToggleMusicProps {
  isPlaying: boolean;
  onToggle: () => void;
}

function ToggleMusic({
  isPlaying,
  onToggle,
}: ToggleMusicProps) {
  const handleClick = (
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-2 right-2 z-[100] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-1 transition-all duration-300 hover:scale-110 border border-white/20 pointer-events-auto"
      aria-label={
        isPlaying
          ? "Pause music"
          : "Play music"
      }
    >
      {isPlaying ? (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}

export default ToggleMusic;
