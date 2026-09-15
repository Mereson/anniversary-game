"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Volume2, VolumeX } from "lucide-react";
import { useRomanticSound } from "@/hooks/use-romantic-sound";
import { soundReview } from "@/lib/sound-review";
import styles from "./sound-review.module.css";

export default function SoundReviewPage() {
  const sound = useRomanticSound();
  const [heartPreview, setHeartPreview] = useState(0);
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.topline}>
          <Link href="/" className={styles.back}>
            <ArrowLeft size={17} /> Back to the game
          </Link>
          <button
            className={styles.mute}
            onClick={() => sound.setEnabled(!sound.enabled)}
            aria-label={sound.enabled ? "Mute sound" : "Enable sound"}
          >
            {sound.enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            {sound.enabled ? "Sound on" : "Sound off"}
          </button>
        </div>
        <header className={styles.intro}>
          <p>THE NEXT CHAPTER · SOUND REVIEW</p>
          <h1>What should each moment feel like?</h1>
          <span>
            Tap each sound separately. Catch a heart has eight variations; play
            it eight times to hear the whole set.
          </span>
        </header>
        <div className={styles.list}>
          {soundReview.map((item, index) => (
            <article key={item.cue} className={styles.cue}>
              <div className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className={styles.description}>
                <h2>{item.moment}</h2>
                <p>
                  <strong>Feeling:</strong> {item.feeling}
                </p>
                <p>
                  <strong>Sound:</strong> {item.sound}
                </p>
              </div>
              <button
                className={styles.play}
                disabled={!sound.enabled}
                onClick={() => {
                  sound.play(item.cue);
                  if (item.cue === "heart")
                    setHeartPreview((count) => count + 1);
                }}
                aria-label={
                  item.cue === "heart"
                    ? `Play heart sound ${(heartPreview % 8) + 1} of 8`
                    : `Play sound for ${item.moment}`
                }
              >
                <Play size={17} fill="currentColor" />{" "}
                {item.cue === "heart"
                  ? `${(heartPreview % 8) + 1} / 8`
                  : "Play"}
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
