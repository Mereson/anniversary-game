"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MUSIC_FILE = "/sounds/background-music-v2.mp3";
const MUSIC_VOLUME = 0.38;

export function useBackgroundMusic() {
  const [enabled, setEnabledState] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const removeUnlockListenersRef = useRef<(() => void) | null>(null);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.muted) return;

    void audio
      .play()
      .then(() => removeUnlockListenersRef.current?.())
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const audio = new Audio(MUSIC_FILE);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = MUSIC_VOLUME;
    audioRef.current = audio;
    audio.load();

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", beginPlayback);
      window.removeEventListener("click", beginPlayback);
      window.removeEventListener("keydown", beginPlayback);
      removeUnlockListenersRef.current = null;
    };
    const beginPlayback = () => {
      if (audio.muted) return;
      void audio
        .play()
        .then(removeUnlockListeners)
        .catch(() => undefined);
    };
    const addUnlockListeners = () => {
      window.addEventListener("pointerdown", beginPlayback);
      window.addEventListener("click", beginPlayback);
      window.addEventListener("keydown", beginPlayback);
      removeUnlockListenersRef.current = removeUnlockListeners;
    };

    void audio.play().then(removeUnlockListeners).catch(addUnlockListeners);

    return () => {
      removeUnlockListeners();
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const setEnabled = useCallback(
    (value: boolean) => {
      setEnabledState(value);
      const audio = audioRef.current;
      if (!audio) return;

      audio.muted = !value;
      if (value) play();
    },
    [play],
  );

  return { enabled, setEnabled, play };
}
