"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { gameContent as copy } from "@/lib/game-content";

type Props = {
  dateChoice: number | null;
  onYes: () => void;
  onNo: () => void;
};

export function InvitationScreen({ dateChoice, onYes, onNo }: Props) {
  const [dodgeCount, setDodgeCount] = useState(0);
  function dodge() {
    setDodgeCount((count) => count + 1);
  }
  return (
    <div className="invitation-screen screen-enter">
      <div className="invite-hearts" aria-hidden="true">
        <span>♥</span>
        <span>♥</span>
        <span>♥</span>
      </div>
      <p className="eyebrow">THE QUESTION YOU&apos;VE BEEN WAITING FOR</p>
      <h2>{copy.invitation}</h2>
      {dateChoice !== null && (
        <p className="chosen-date">
          You picked <strong>{copy.dates[dateChoice].title}</strong>. Excellent
          choice.
        </p>
      )}
      <div className="invitation-actions">
        <button className="primary-button yes-button" onClick={onYes}>
          Yes, I&apos;d love to <Heart size={17} fill="currentColor" />
        </button>
        <span className="no-button-space">
          <button
            className={`secondary-button no-button dodge-${dodgeCount % 4}`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") dodge();
            }}
            onClick={() => {
              dodge();
              onNo();
            }}
          >
            {copy.dodgeLabel}
          </button>
        </span>
      </div>
      <p className="dodge-note" aria-live="polite">
        {dodgeCount > 0
          ? copy.dodgeMessages[(dodgeCount - 1) % copy.dodgeMessages.length]
          : ""}
      </p>
      <p className="hint">Whatever you choose, I&apos;m glad it&apos;s you.</p>
      <p className="submission-note">
        Choosing Yes sends your answers and date choice to Stephen.
      </p>
    </div>
  );
}
