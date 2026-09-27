import { Heart, Volume2, VolumeX } from "lucide-react";
import { BackgroundStars } from "./background-stars";

type Props = {
  children: React.ReactNode;
  progress: number;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onReset: () => void;
};

export function GameFrame({
  children,
  progress,
  soundEnabled,
  onSoundToggle,
  onReset,
}: Props) {
  return (
    <main className="game-shell">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <BackgroundStars />
      <header className="topbar">
        <button className="brand" onClick={onReset} aria-label="Start over">
          <span className="brand-mark">
            <Heart size={17} fill="currentColor" />
          </span>
          <span>the next chapter</span>
        </button>
        <div className="top-actions">
          <span className="chapter-label">A STORY FOR TWO</span>
          <button
            className="icon-button"
            onClick={onSoundToggle}
            aria-label={soundEnabled ? "Mute music" : "Play music"}
            title={soundEnabled ? "Music on" : "Music off"}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </header>
      <div className="game-layout">
        <nav className="progress" aria-label="Game progress">
          <span>OUR LITTLE JOURNEY</span>
          <div className="progress-track">
            {Array.from({ length: 7 }, (_, index) => (
              <i key={index} className={index < progress ? "filled" : ""} />
            ))}
          </div>
          <small>
            {progress === 0
              ? "Ready when you are"
              : `${Math.min(progress, 7)} of 7 moments`}
          </small>
        </nav>
        <section className="story-card" aria-live="polite">
          {children}
        </section>
        <p className="bottom-line">
          Made with love, for the story still to come{" "}
          <Heart size={13} fill="currentColor" />
        </p>
      </div>
    </main>
  );
}
