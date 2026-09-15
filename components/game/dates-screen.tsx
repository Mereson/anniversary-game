import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = {
  choice: number | null;
  onChoose: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
};

export function DatesScreen({ choice, onChoose, onBack, onNext }: Props) {
  return (
    <div className="dates-screen screen-enter">
      <div className="section-icon">
        <Sparkles size={23} />
      </div>
      <p className="eyebrow">PICK OUR NEXT ADVENTURE</p>
      <h2>What sounds like us?</h2>
      <p className="support">
        Choose the kind of date you&apos;d love. I&apos;ll take it from there.
      </p>
      <div className="date-grid">
        {copy.dates.map((date, index) => (
          <button
            key={index}
            className={`date-card ${choice === index ? "chosen" : ""}`}
            onClick={() => onChoose(index)}
            aria-pressed={choice === index}
          >
            <span className="date-icon">{date.icon}</span>
            <strong>{date.title}</strong>
            <span>{date.description}</span>
            <span className="radio-dot" />
          </button>
        ))}
      </div>
      <div className="card-footer">
        <button className="text-button" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <button
          className="primary-button compact"
          disabled={choice === null}
          onClick={onNext}
        >
          One last thing <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
