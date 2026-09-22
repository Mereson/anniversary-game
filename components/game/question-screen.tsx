import { ArrowLeft, ArrowRight, Heart, Sparkles } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = {
  index: number;
  answer: string;
  onAnswer: (answer: string) => void;
  onBack: () => void;
  onNext: () => void;
};

export function QuestionScreen({
  index,
  answer,
  onAnswer,
  onBack,
  onNext,
}: Props) {
  const question = copy.questions[index];
  const choiceIndex =
    question.type === "choice" ? question.answers.indexOf(answer) : -1;
  const complete = answer.trim().length > 0;

  return (
    <div className="memory-screen screen-enter" key={index}>
      <div className="section-icon">
        <Sparkles size={24} />
      </div>
      <p className="eyebrow">
        FROM THE HEART · {String(index + 1).padStart(2, "0")} /{" "}
        {String(copy.questions.length).padStart(2, "0")}
      </p>
      <h2>{question.question}</h2>
      <p className="support">Take your time. There is no wrong answer here.</p>

      {question.type === "text" ? (
        <textarea
          className="heart-answer"
          value={answer}
          onChange={(event) => onAnswer(event.target.value)}
          placeholder={question.placeholder}
          maxLength={600}
          rows={5}
          autoFocus
        />
      ) : (
        <div className="answer-list">
          {question.answers.map((choice, index) => (
            <button
              key={choice}
              className={`answer-option ${answer === choice ? "selected" : ""}`}
              onClick={() => onAnswer(choice)}
            >
              <span className="answer-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{choice}</span>
              <ArrowRight size={17} />
            </button>
          ))}
        </div>
      )}

      {complete && (
        <div className="feedback">
          <Heart size={18} fill="currentColor" />
          <span>
            {question.type === "text"
              ? question.response
              : question.responses[choiceIndex]}
          </span>
        </div>
      )}
      <div className="card-footer">
        <button className="text-button" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <button
          className="primary-button compact"
          disabled={!complete}
          onClick={onNext}
        >
          Keep going <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
