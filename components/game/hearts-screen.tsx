import { Heart } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = { caught: number[]; onCatch: (index: number) => void };

export function HeartsScreen({ caught, onCatch }: Props) {
  const remaining = copy.heartWords.length - caught.length;
  return (
    <div className="hearts-screen screen-enter">
      <div className="section-icon">
        <Heart size={23} fill="currentColor" />
      </div>
      <p className="eyebrow">A LITTLE HEART HUNT</p>
      <h2>Catch the love.</h2>
      <p className="support">
        Tap each heart to reveal a little something. {remaining} to go.
      </p>
      <div className="heart-field">
        {copy.heartWords.map((_, index) => (
          <button
            key={index}
            className={`catch-heart heart-${index} ${caught.includes(index) ? "caught" : ""}`}
            style={{ animationDelay: `${index * -0.42}s` }}
            onClick={() => onCatch(index)}
            disabled={caught.includes(index)}
            aria-label={`Catch heart ${index + 1}`}
          >
            <Heart fill="currentColor" strokeWidth={1} />
          </button>
        ))}
      </div>
      <div className="revealed-message" aria-live="polite">
        {caught.length ? (
          copy.heartWords
            .slice(0, caught.length)
            .map((word, index) => <span key={index}>{word}</span>)
        ) : (
          <em>Your message is hiding in the hearts…</em>
        )}
      </div>
      {remaining === 0 && (
        <p className="complete-note">
          Beautifully done. Your next surprise is coming…
        </p>
      )}
    </div>
  );
}
