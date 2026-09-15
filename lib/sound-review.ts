import type { SoundCue } from "@/hooks/use-romantic-sound";

export const soundReview: {
  cue: SoundCue;
  moment: string;
  feeling: string;
  sound: string;
}[] = [
  {
    cue: "begin",
    moment: "Let's begin",
    feeling: "A warm invitation and a small sense of anticipation",
    sound: "A piano phrase that rises into the new chapter",
  },
  {
    cue: "answer",
    moment: "Choose an answer",
    feeling: "Recognition, tenderness, and being seen",
    sound: "A soft resolving piano-and-harp phrase",
  },
  {
    cue: "next",
    moment: "Keep going",
    feeling: "Hope and a gentle lift toward what comes next",
    sound: "A short upward harp phrase",
  },
  {
    cue: "heart",
    moment: "Catch a heart",
    feeling: "Affection that feels light and playful",
    sound: "Eight distinct, bright bell-like sparkles",
  },
  {
    cue: "choice",
    moment: "Choose our date",
    feeling: "Possibility becoming a real plan",
    sound: "A warmer phrase that settles into a bright final note",
  },
  {
    cue: "invitation",
    moment: "Open the proposal",
    feeling: "Excitement, with a breath before the question",
    sound: "A rising flourish that opens out at the end",
  },
  {
    cue: "yes",
    moment: "Yes, I'd love to",
    feeling: "Happiness and joyful release",
    sound: "A fuller, brighter major-key celebration",
  },
  {
    cue: "no",
    moment: "Try the runaway No",
    feeling: "A tiny wink, without turning the moment mean",
    sound: "A quick playful harp slip",
  },
];
