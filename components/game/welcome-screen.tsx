import { ArrowRight } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";
import { HeroHeart } from "./hero-heart";

export function WelcomeScreen({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="welcome-screen screen-enter">
      <HeroHeart />
      <p className="eyebrow">{copy.openingEyebrow}</p>
      <h1>
        {copy.openingTitle}
        <span className="period">.</span>
      </h1>
      <p className="lead">{copy.openingMessage}</p>
      <button className="primary-button" onClick={onBegin}>
        Let&apos;s begin <ArrowRight size={18} />
      </button>
      <p className="hint">
        A journey through our memories. A little magic. One important question.
      </p>
    </div>
  );
}
