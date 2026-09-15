import { Flower2, Heart } from "lucide-react";

const decorations = [
  { kind: "star", left: "7%", top: "23%", delay: "-2s", duration: "17s" },
  { kind: "star", left: "12%", top: "54%", delay: "-9s", duration: "22s" },
  { kind: "star", left: "21%", top: "79%", delay: "-5s", duration: "19s" },
  { kind: "star", left: "31%", top: "9%", delay: "-13s", duration: "24s" },
  { kind: "star", left: "44%", top: "90%", delay: "-4s", duration: "20s" },
  { kind: "star", left: "57%", top: "7%", delay: "-16s", duration: "23s" },
  { kind: "star", left: "73%", top: "12%", delay: "-8s", duration: "21s" },
  { kind: "star", left: "82%", top: "27%", delay: "-3s", duration: "18s" },
  { kind: "star", left: "91%", top: "54%", delay: "-12s", duration: "25s" },
  { kind: "star", left: "77%", top: "83%", delay: "-6s", duration: "19s" },
  { kind: "star", left: "94%", top: "90%", delay: "-15s", duration: "22s" },
  { kind: "star", left: "4%", top: "91%", delay: "-10s", duration: "20s" },
  { kind: "heart", left: "5%", top: "39%", delay: "-4s", duration: "20s" },
  { kind: "heart", left: "17%", top: "11%", delay: "-11s", duration: "24s" },
  { kind: "heart", left: "87%", top: "70%", delay: "-6s", duration: "18s" },
  { kind: "heart", left: "68%", top: "91%", delay: "-16s", duration: "22s" },
  { kind: "flower", left: "3%", top: "70%", delay: "-13s", duration: "25s" },
  { kind: "flower", left: "89%", top: "15%", delay: "-7s", duration: "23s" },
  { kind: "flower", left: "97%", top: "42%", delay: "-2s", duration: "20s" },
  { kind: "flower", left: "15%", top: "87%", delay: "-18s", duration: "27s" },
] as const;

export function BackgroundStars() {
  return (
    <div className="background-stars" aria-hidden="true">
      {decorations.map((decoration, index) => (
        <span
          key={index}
          className={`floating-decoration floating-${decoration.kind}`}
          style={{
            left: decoration.left,
            top: decoration.top,
            animationDelay: decoration.delay,
            animationDuration: decoration.duration,
          }}
        >
          {decoration.kind === "star" ? (
            index % 3 === 0 ? (
              "✧"
            ) : (
              "✦"
            )
          ) : decoration.kind === "heart" ? (
            <Heart fill="currentColor" strokeWidth={1} />
          ) : (
            <Flower2 strokeWidth={1.3} />
          )}
        </span>
      ))}
    </div>
  );
}
