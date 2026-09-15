// The September 29 brief supplies the game structure and proposal wording.
// Only the recipient's name and real shared memories still need personal details.
const PLAYER_NAME = "Girlfriend";
const PARTNER_NAME = "Stephen";

export const gameContent = {
  anniversaryDate: "September 29",
  playerName: PLAYER_NAME,
  partnerName: PARTNER_NAME,
  openingEyebrow: "SEPTEMBER 29 · OUR NEXT CHAPTER",
  openingTitle: "The Next Chapter",
  openingMessage:
    `${PLAYER_NAME} detected. Your adventure with ${PARTNER_NAME} continues. A new chapter is waiting.`,
  memories: [
    {
      question: "What makes an ordinary day feel like an adventure?",
      answers: ["A little detour", "Your favorite snack", "Being together"],
      correct: 2,
      success: "Exactly. The best part has always been us.",
      other: "A very good answer, honestly. Being together is my favorite.",
    },
    {
      question:
        "If we could press pause on one kind of moment, which would it be?",
      answers: ["The silly ones", "The quiet ones", "All of them"],
      correct: 2,
      success: "I knew you would say that.",
      other: "I love those too. I think I would keep all of them.",
    },
    {
      question: "What should we make more room for in our next chapter?",
      answers: ["New places", "More laughter", "All of the above"],
      correct: 2,
      success: "That sounds like a plan.",
      other: "Absolutely. And I hope we make room for all of it.",
    },
  ],
  heartWords: ["You", "make", "every", "chapter", "my", "favorite", "one", "♥"],
  dates: [
    {
      icon: "🍝",
      title: "Dinner",
      description: "Good food, great company, no rush.",
    },
    {
      icon: "🎬",
      title: "Movie night",
      description: "Pick a film and share the popcorn.",
    },
    {
      icon: "🧺",
      title: "Picnic",
      description: "A blanket, something tasty, and time together.",
    },
    {
      icon: "🎁",
      title: "Surprise me",
      description: "You choose the vibe. I'll make the plan.",
    },
  ],
  invitation: "Will you be my woman again and again?",
  dodgeLabel: "No, I don't",
  dodgeMessages: [
    "Hmm... that answer doesn't seem to be working. Try again.",
    "The No button is having second thoughts.",
    "Even the button wants another chapter.",
    "It slipped away again. The Yes button is much friendlier.",
  ],
  yesMessage: `Date accepted! ${PARTNER_NAME} + ${PLAYER_NAME} — our next chapter begins. ♥`,
};
