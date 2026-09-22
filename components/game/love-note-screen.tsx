import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = { onBack: () => void; onNext: () => void };

export function LoveNoteScreen({ onBack, onNext }: Props) {
  return (
    <div className="love-note-screen screen-enter">
      <div className="note-heart" aria-hidden="true">
        <Heart fill="currentColor" strokeWidth={1.2} />
      </div>
      <p className="eyebrow">{copy.note.eyebrow}</p>
      <div className="love-note-copy">
        {copy.note.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="card-footer">
        <button className="text-button" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <button className="primary-button compact" onClick={onNext}>
          One last thing <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
