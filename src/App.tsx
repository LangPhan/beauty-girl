import {
  useMemo,
  useRef,
  useState,
} from "react";
import CurvedLoop from "./components/CurvedLoop";
import FlyingPosters from "./components/FlyingPosters";
import LightRays from "./components/LightRays";
import ToggleMusic from "./components/ToggleMusic";

function App() {
  const audioRef =
    useRef<HTMLAudioElement>(null);
  const [showOverlay, setShowOverlay] =
    useState(true);
  const [isPlaying, setIsPlaying] =
    useState(false);
  const items = useMemo(
    () =>
      Array.from(
        { length: 14 },
        (_, i) =>
          `/princess/${i + 1}.jpg`
      ),
    []
  );

  const handleStart = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setShowOverlay(false);
        setIsPlaying(true);
      } catch (error) {
        console.log(
          "Failed to play audio:",
          error
        );
      }
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <main className="h-screen w-screen bg-black overflow-x-hidden relative">
      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={handleStart}
        >
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome 👸
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Click anywhere to enter
            </p>
            <div className="animate-bounce">
              <svg
                className="w-12 h-12 mx-auto text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <ToggleMusic
        isPlaying={isPlaying}
        onToggle={toggleMusic}
      />

      <LightRays
        raysOrigin="top-center"
        raysColor="#ffff"
        raysSpeed={1.5}
        lightSpread={2.8}
        rayLength={5.6}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
      <FlyingPosters
        items={items}
        cameraZ={50}
        distortion={1.2}
      />
      <CurvedLoop
        marqueeText="My ✦ Princess ✦ Đinh ✦ Thị ✦ An 👸"
        speed={3}
        curveAmount={500}
        direction="left"
        interactive={true}
      />
      <audio ref={audioRef} loop>
        <source
          src="/music.mp3"
          type="audio/mpeg"
        />
      </audio>
    </main>
  );
}

export default App;
