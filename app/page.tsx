"use client";

import { useEffect, useState } from "react";
import { DatesScreen } from "@/components/game/dates-screen";
import { EndingScreen } from "@/components/game/ending-screen";
import { GameFrame } from "@/components/game/game-frame";
import { HeartsScreen } from "@/components/game/hearts-screen";
import { InvitationScreen } from "@/components/game/invitation-screen";
import { MemoryScreen } from "@/components/game/memory-screen";
import { WelcomeScreen } from "@/components/game/welcome-screen";
import { useRomanticSound } from "@/hooks/use-romantic-sound";
import { gameContent } from "@/lib/game-content";

type Stage =
  "welcome" | "memory" | "hearts" | "dates" | "invitation" | "ending";

export default function Home() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [caught, setCaught] = useState<number[]>([]);
  const [dateChoice, setDateChoice] = useState<number | null>(null);
  const sound = useRomanticSound();

  const progress =
    stage === "welcome"
      ? 0
      : stage === "memory"
        ? memoryIndex + 1
        : stage === "hearts"
          ? 4
          : stage === "dates"
            ? 5
            : 6;

  useEffect(() => {
    if (stage !== "hearts" || caught.length !== gameContent.heartWords.length)
      return;
    const timer = window.setTimeout(() => setStage("dates"), 1900);
    return () => window.clearTimeout(timer);
  }, [stage, caught.length]);

  function reset() {
    setStage("welcome");
    setMemoryIndex(0);
    setAnswer(null);
    setCaught([]);
    setDateChoice(null);
  }

  function nextMemory() {
    sound.play("next");
    setAnswer(null);
    if (memoryIndex < gameContent.memories.length - 1)
      setMemoryIndex((index) => index + 1);
    else setStage("hearts");
  }

  function catchHeart(index: number) {
    if (caught.includes(index)) return;
    sound.play("heart");
    setCaught((previous) => [...previous, index]);
  }

  function finish() {
    sound.play("yes");
    setStage("ending");
  }

  return (
    <GameFrame
      progress={progress}
      soundEnabled={sound.enabled}
      onSoundToggle={() => sound.setEnabled(!sound.enabled)}
      onReset={reset}
    >
      {stage === "welcome" && (
        <WelcomeScreen
          onBegin={() => {
            sound.play("begin");
            setStage("memory");
          }}
        />
      )}
      {stage === "memory" && (
        <MemoryScreen
          index={memoryIndex}
          answer={answer}
          onAnswer={(index) => {
            sound.play("answer");
            setAnswer(index);
          }}
          onBack={() => {
            setAnswer(null);
            if (memoryIndex === 0) setStage("welcome");
            else setMemoryIndex((index) => index - 1);
          }}
          onNext={nextMemory}
        />
      )}
      {stage === "hearts" && (
        <HeartsScreen caught={caught} onCatch={catchHeart} />
      )}
      {stage === "dates" && (
        <DatesScreen
          choice={dateChoice}
          onChoose={(index) => {
            sound.play("choice");
            setDateChoice(index);
          }}
          onBack={() => setStage("hearts")}
          onNext={() => {
            sound.play("invitation");
            setStage("invitation");
          }}
        />
      )}
      {stage === "invitation" && (
        <InvitationScreen
          dateChoice={dateChoice}
          onYes={finish}
          onNo={() => sound.play("no")}
        />
      )}
      {stage === "ending" && (
        <EndingScreen dateChoice={dateChoice} onReplay={reset} />
      )}
    </GameFrame>
  );
}
