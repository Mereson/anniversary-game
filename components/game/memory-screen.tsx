import { ArrowLeft, ArrowRight, Heart, Sparkles } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = {
  index: number;
  answer: number | null;
  onAnswer: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
};

export function MemoryScreen({
  index,
  answer,
  onAnswer,
  onBack,
  onNext,
}: Props) {
  const memory = copy.memories[index];
  return (
    <div className="memory-screen screen-enter" key={index}>
      <div className="section-icon">
        <Sparkles size={24} />
      </div>
      <p className="eyebrow">
        MEMORY LANE · {String(index + 1).padStart(2, "0")} / 03
      </p>
      <h2>{memory.question}</h2>
      <p className="support">There are no wrong turns down memory lane.</p>
      <div className="answer-list">
        {memory.answers.map((choice, choiceIndex) => (
          <button
            key={choiceIndex}
            className={`answer-option ${answer === choiceIndex ? "selected" : ""}`}
            disabled={answer !== null}
            onClick={() => onAnswer(choiceIndex)}
          >
            <span className="answer-letter">
              {String.fromCharCode(65 + choiceIndex)}
            </span>
            <span>{choice}</span>
            <ArrowRight size={17} />
          </button>
        ))}
      </div>
      {answer !== null && (
        <div className="feedback">
          <Heart size={18} fill="currentColor" />
          <span>
            {answer === memory.correct ? memory.success : memory.other}
          </span>
        </div>
      )}
      <div className="card-footer">
        <button className="text-button" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        {answer !== null && (
          <button className="primary-button compact" onClick={onNext}>
            Keep going <ArrowRight size={17} />
          </button>
        )}
      </div>
    </div>
  );
}
