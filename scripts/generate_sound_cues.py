"""Generate original, short instrument-like WAV cues for the anniversary game.

These are intentionally musical moments rather than generic UI effects. Each
motif has its own contour and length, while piano, harp, and bell-like voices
keep the set cohesive. No third-party audio samples are used.
"""

from pathlib import Path
import wave

import numpy as np

SAMPLE_RATE = 32000
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "sounds"
OUTPUT.mkdir(parents=True, exist_ok=True)

NOTES = {
    "C4": 261.63, "E4": 329.63, "G4": 392.00, "A4": 440.00,
    "B4": 493.88, "C5": 523.25, "D5": 587.33, "E5": 659.25,
    "G5": 783.99, "A5": 880.00, "B5": 987.77, "C6": 1046.50,
    "D6": 1174.66, "E6": 1318.51, "F6": 1396.91,
    "G6": 1567.98, "A6": 1760.00,
}


def voice(frequency: float, duration: float, kind: str) -> np.ndarray:
    count = int(duration * SAMPLE_RATE)
    t = np.arange(count, dtype=np.float64) / SAMPLE_RATE
    attack = 1 - np.exp(-t / (0.004 if kind == "harp" else 0.012))
    if kind == "piano":
        partials = [(1, 1.0), (2, .43), (3, .20), (4, .11), (5, .06)]
        decay = 1.35
    elif kind == "harp":
        partials = [(1, 1.0), (2, .37), (3, .17), (4, .09), (5, .04)]
        decay = .74
    else:  # a light, glassy bell for the hearts
        partials = [(1, 1.0), (2, .22), (3, .06), (4, .035)]
        decay = 1.15

    result = np.zeros(count, dtype=np.float64)
    for harmonic, strength in partials:
        # Upper harmonics fall away faster, as they do on a struck/plucked note.
        tail = np.exp(-t * harmonic**.45 / decay)
        slight_detune = 1 + .00016 * harmonic**2 if kind == "piano" else 1
        result += strength * np.sin(2 * np.pi * frequency * harmonic * slight_detune * t) * tail
    result *= attack
    result *= np.minimum(1, np.maximum(0, duration - t) / .13)
    return result / sum(strength for _, strength in partials)


def render(name: str, notes: list[tuple[str, float, str, float]], length: float) -> None:
    audio = np.zeros(int(length * SAMPLE_RATE), dtype=np.float64)
    for pitch, onset, kind, strength in notes:
        note = voice(NOTES[pitch], min(1.65, length - onset), kind) * strength
        start = int(onset * SAMPLE_RATE)
        audio[start:start + len(note)] += note[:len(audio) - start]

    # A few very quiet reflections give the sound air without muddying attacks.
    for delay, gain in ((.095, .075), (.19, .045), (.31, .025)):
        shifted = np.pad(audio, (int(delay * SAMPLE_RATE), 0))[:len(audio)]
        audio += shifted * gain

    fade = np.minimum(1, np.arange(len(audio)) / (SAMPLE_RATE * .015))
    fade *= np.minimum(1, np.arange(len(audio))[::-1] / (SAMPLE_RATE * .19))
    audio *= fade
    peak = np.max(np.abs(audio)) or 1
    audio = np.clip(audio / peak * .42, -1, 1)
    pcm = (audio * 32767).astype("<i2")
    with wave.open(str(OUTPUT / f"{name}.wav"), "wb") as file:
        file.setnchannels(1)
        file.setsampwidth(2)
        file.setframerate(SAMPLE_RATE)
        file.writeframes(pcm.tobytes())


# Invitation, recognition, lift, affection, possibility, excitement, joy.
render("begin", [("C4", 0, "piano", .50), ("G4", .24, "piano", .47), ("E5", .52, "piano", .52)], 1.75)
render("answer", [("G4", 0, "piano", .39), ("C5", .12, "piano", .45), ("E5", .37, "harp", .48)], 1.35)
render("next", [("C5", 0, "harp", .42), ("D5", .19, "harp", .42), ("G5", .44, "piano", .51)], 1.5)
render("heart-1", [("C6", 0, "bell", .45), ("E6", .14, "bell", .37)], 1.05)
render("heart-2", [("D6", 0, "bell", .43), ("G6", .16, "bell", .34)], 1.05)
render("heart-3", [("E6", 0, "bell", .43), ("C6", .19, "bell", .35)], 1.05)
render("heart-4", [("G5", 0, "bell", .34), ("C6", .11, "bell", .42), ("E6", .24, "bell", .30)], 1.12)
render("heart-5", [("A5", 0, "bell", .38), ("D6", .21, "bell", .39)], 1.08)
render("heart-6", [("G6", 0, "bell", .40), ("E6", .17, "bell", .33), ("C6", .31, "bell", .24)], 1.15)
render("heart-7", [("B5", 0, "bell", .37), ("D6", .12, "bell", .32), ("G6", .29, "bell", .39)], 1.16)
render("heart-8", [("F6", 0, "bell", .36), ("A6", .17, "bell", .40), ("F6", .31, "bell", .25)], 1.2)
render("choice", [("C5", 0, "harp", .39), ("E5", .18, "piano", .42), ("G5", .41, "piano", .44), ("B5", .68, "bell", .28)], 1.75)
render("invitation", [("G4", 0, "piano", .34), ("C5", .17, "piano", .39), ("E5", .35, "harp", .43), ("G5", .55, "harp", .47), ("C6", .88, "bell", .36)], 2.15)
render("yes", [("C5", 0, "piano", .43), ("E5", .14, "piano", .43), ("G5", .28, "harp", .45), ("C6", .48, "bell", .43), ("E6", .73, "bell", .37), ("G6", .98, "bell", .34)], 2.6)
render("no", [("B4", 0, "harp", .37), ("A4", .15, "harp", .31)], .95)

print(f"Wrote {len(list(OUTPUT.glob('*.wav')))} sound cues to {OUTPUT}")
