import { Heart, RotateCcw } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = {
  dateChoice: number | null;
  onReplay: () => void;
};

export function EndingScreen({ dateChoice, onReplay }: Props) {
  return (
    <div className="ending-screen screen-enter">
      <div className="ending-art" aria-hidden="true">
        <Heart fill="currentColor" strokeWidth={1} />
        <span>✦</span>
        <span>✧</span>
      </div>
      <p className="eyebrow">SEPTEMBER 29 · THIS IS JUST THE BEGINNING</p>
      <h2>It’s a date!</h2>
      <p className="lead">{copy.yesMessage}</p>
      {dateChoice !== null && (
        <div className="ending-choice">
          <span>OUR NEXT ADVENTURE</span>
          <strong>
            {copy.dates[dateChoice].icon} {copy.dates[dateChoice].title}
          </strong>
        </div>
      )}
      <button className="secondary-button replay" onClick={onReplay}>
        <RotateCcw size={16} /> Play again
      </button>
    </div>
  );
}
