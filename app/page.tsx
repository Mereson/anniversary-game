"use client";

import { useEffect, useState } from "react";
import { DatesScreen } from "@/components/game/dates-screen";
import { EndingScreen } from "@/components/game/ending-screen";
import { GameFrame } from "@/components/game/game-frame";
import { HeartsScreen } from "@/components/game/hearts-screen";
import { InvitationScreen } from "@/components/game/invitation-screen";
import { LoveNoteScreen } from "@/components/game/love-note-screen";
import { QuestionScreen } from "@/components/game/question-screen";
import { WelcomeScreen } from "@/components/game/welcome-screen";
import { useBackgroundMusic } from "@/hooks/use-background-music";
import { gameContent } from "@/lib/game-content";

type Stage =
  | "welcome"
  | "questions"
  | "hearts"
  | "dates"
  | "note"
  | "invitation"
  | "ending";
type SendStatus = "idle" | "sending" | "submitted" | "error";

export default function Home() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() =>
    gameContent.questions.map(() => ""),
  );
  const [caught, setCaught] = useState<number[]>([]);
  const [dateChoice, setDateChoice] = useState<number | null>(null);
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const music = useBackgroundMusic();

  const progress =
    stage === "welcome"
      ? 0
      : stage === "questions"
        ? Math.min(
            3,
            Math.ceil(((questionIndex + 1) / gameContent.questions.length) * 3),
          )
        : stage === "hearts"
          ? 4
          : stage === "dates"
            ? 5
            : stage === "note"
              ? 6
              : 7;

  useEffect(() => {
    if (stage !== "hearts" || caught.length !== gameContent.heartWords.length)
      return;
    const timer = window.setTimeout(() => setStage("dates"), 1900);
    return () => window.clearTimeout(timer);
  }, [stage, caught.length]);

  useEffect(() => {
    if (stage === "note") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  function reset() {
    setStage("welcome");
    setQuestionIndex(0);
    setAnswers(gameContent.questions.map(() => ""));
    setCaught([]);
    setDateChoice(null);
    setSendStatus("idle");
  }

  function nextQuestion() {
    if (questionIndex < gameContent.questions.length - 1)
      setQuestionIndex((index) => index + 1);
    else setStage("hearts");
  }

  function catchHeart(index: number) {
    if (caught.includes(index)) return;
    setCaught((previous) => [...previous, index]);
  }

  async function finish() {
    setStage("ending");
    setSendStatus("sending");
    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: gameContent.questions.map((question, index) => ({
            question: question.question,
            answer: answers[index],
          })),
          dateChoice:
            dateChoice === null
              ? "No date selected"
              : gameContent.dates[dateChoice].title,
          finalAnswer: "Yes, I'd love to",
        }),
      });
      setSendStatus(response.ok ? "submitted" : "error");
    } catch {
      setSendStatus("error");
    }
  }

  return (
    <GameFrame
      progress={progress}
      soundEnabled={music.enabled}
      onSoundToggle={() => music.setEnabled(!music.enabled)}
      onReset={reset}
    >
      {stage === "welcome" && (
        <WelcomeScreen onBegin={() => setStage("questions")} />
      )}
      {stage === "questions" && (
        <QuestionScreen
          index={questionIndex}
          answer={answers[questionIndex]}
          onAnswer={(answer) => {
            setAnswers((current) =>
              current.map((value, index) =>
                index === questionIndex ? answer : value,
              ),
            );
          }}
          onBack={() => {
            if (questionIndex === 0) setStage("welcome");
            else setQuestionIndex((index) => index - 1);
          }}
          onNext={nextQuestion}
        />
      )}
      {stage === "hearts" && (
        <HeartsScreen caught={caught} onCatch={catchHeart} />
      )}
      {stage === "dates" && (
        <DatesScreen
          choice={dateChoice}
          onChoose={(index) => {
            setDateChoice(index);
          }}
          onBack={() => setStage("hearts")}
          onNext={() => {
            setStage("note");
          }}
        />
      )}
      {stage === "note" && (
        <LoveNoteScreen
          onBack={() => setStage("dates")}
          onNext={() => {
            setStage("invitation");
          }}
        />
      )}
      {stage === "invitation" && (
        <InvitationScreen dateChoice={dateChoice} onYes={finish} />
      )}
      {stage === "ending" && (
        <EndingScreen
          dateChoice={dateChoice}
          sendStatus={sendStatus}
          onRetry={finish}
          onReplay={reset}
        />
      )}
    </GameFrame>
  );
}
