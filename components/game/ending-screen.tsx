import { Heart, LoaderCircle, RefreshCw, RotateCcw } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = {
  dateChoice: number | null;
  sendStatus: "idle" | "sending" | "submitted" | "error";
  onRetry: () => void;
  onReplay: () => void;
};

export function EndingScreen({
  dateChoice,
  sendStatus,
  onRetry,
  onReplay,
}: Props) {
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
      <div className={`delivery-status delivery-${sendStatus}`} role="status">
        {sendStatus === "sending" && (
          <>
            <LoaderCircle className="status-spinner" size={16} /> Sending your
            answers…
          </>
        )}
        {sendStatus === "submitted" && (
          <>
            <Heart size={15} fill="currentColor" /> Your answers have been sent
            to Stephen.
          </>
        )}
        {sendStatus === "error" && (
          <>
            <span>
              The email could not be sent. Please keep this page open and try
              again.
            </span>
            <button className="text-button" onClick={onRetry}>
              <RefreshCw size={14} /> Try again
            </button>
          </>
        )}
      </div>
      <button className="secondary-button replay" onClick={onReplay}>
        <RotateCcw size={16} /> Play again
      </button>
    </div>
  );
}
