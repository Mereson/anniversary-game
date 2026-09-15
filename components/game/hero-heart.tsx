import { Heart } from "lucide-react";

export function HeroHeart() {
  return (
    <div className="hero-art" aria-hidden="true">
      <span className="orbit orbit-one" />
      <span className="orbit orbit-two" />
      <span className="hero-heart">
        <Heart fill="currentColor" strokeWidth={1.2} />
      </span>
      <span className="star-orbit star-orbit-outer">
        <i>✦</i>
        <i>✧</i>
      </span>
      <span className="star-orbit star-orbit-inner">
        <i>✦</i>
      </span>
    </div>
  );
}
