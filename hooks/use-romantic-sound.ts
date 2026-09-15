"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SoundCue =
  | "begin"
  | "answer"
  | "heart"
  | "choice"
  | "next"
  | "invitation"
  | "yes"
  | "no";

const cueFile: Record<Exclude<SoundCue, "heart">, string> = {
  begin: "begin.wav",
  answer: "answer.wav",
  next: "next.wav",
  choice: "choice.wav",
  invitation: "invitation.wav",
  yes: "yes.wav",
  no: "no.wav",
};

export function useRomanticSound() {
  const [enabled, setEnabled] = useState(true);
  const playingRef = useRef<Set<HTMLAudioElement>>(new Set());
  const heartIndexRef = useRef(0);

  useEffect(
    () => () => {
      playingRef.current.forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      playingRef.current.clear();
    },
    [],
  );

  const play = useCallback(
    (cue: SoundCue) => {
      if (!enabled) return;
      const file =
        cue === "heart"
          ? `heart-${(heartIndexRef.current++ % 8) + 1}.wav`
          : cueFile[cue];
      const audio = new Audio(`/sounds/${file}`);
      audio.volume = cue === "yes" || cue === "invitation" ? 0.76 : 0.66;
      playingRef.current.add(audio);
      audio.addEventListener("ended", () => playingRef.current.delete(audio), {
        once: true,
      });
      audio.addEventListener("error", () => playingRef.current.delete(audio), {
        once: true,
      });
      // Every call is made from a tap/click; browser audio stays silent until then.
      void audio.play().catch(() => playingRef.current.delete(audio));
    },
    [enabled],
  );

  const updateEnabled = useCallback((value: boolean) => {
    setEnabled(value);
    if (!value) {
      playingRef.current.forEach((audio) => audio.pause());
      playingRef.current.clear();
    }
  }, []);

  return { enabled, setEnabled: updateEnabled, play };
}
