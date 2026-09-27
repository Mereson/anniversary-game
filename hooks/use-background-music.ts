"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_FILE = "/sounds/background-music.mp3";
const MUSIC_VOLUME = 0.38;

export function useBackgroundMusic() {
  const [enabled, setEnabledState] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_FILE);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = MUSIC_VOLUME;
    audioRef.current = audio;

    const beginPlayback = () => {
      if (!audio.muted) void audio.play().catch(() => undefined);
    };

    void audio.play().catch(() => {
      window.addEventListener("pointerdown", beginPlayback, { once: true });
      window.addEventListener("keydown", beginPlayback, { once: true });
    });

    return () => {
      window.removeEventListener("pointerdown", beginPlayback);
      window.removeEventListener("keydown", beginPlayback);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !value;
    if (value) void audio.play().catch(() => undefined);
  }, []);

  return { enabled, setEnabled };
}
