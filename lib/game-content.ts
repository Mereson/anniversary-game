const PLAYER_NAME = "Yeti";
const PARTNER_NAME = "Stephen";

export const gameContent = {
  anniversaryDate: "September 29",
  playerName: PLAYER_NAME,
  partnerName: PARTNER_NAME,
  openingEyebrow: "SEPTEMBER 29 · OUR NEXT CHAPTER",
  openingTitle: "The Next Chapter",
  openingMessage: `${PLAYER_NAME} detected. Your adventure with ${PARTNER_NAME} continues. A new chapter is waiting.`,
  questions: [
    {
      type: "text" as const,
      question: "What's the one favorite moment you'd like to relive?",
      placeholder: "Write the moment that came to mind…",
      response: "Some memories deserve another page.",
    },
    {
      type: "choice" as const,
      question:
        "If we could press pause on one kind of moment, which would it be?",
      answers: ["The silly ones", "The quiet ones", "All of them"],
      responses: [
        "The laughter is part of what makes us, us.",
        "The quiet moments have their own kind of magic.",
        "I would keep every kind of moment too.",
      ],
    },
    {
      type: "choice" as const,
      question: "What makes an ordinary day feel like an adventure?",
      answers: ["A little detour", "Your favorite snack", "Being together"],
      responses: [
        "The unexpected turns make the best stories.",
        "A favorite snack can fix almost anything.",
        "Exactly. The best part has always been us.",
      ],
    },
    {
      type: "choice" as const,
      question:
        "If I told you I don't want to simply ask for another chance—I want to earn one—would you let me?",
      answers: ["Yes, I would", "No, I wouldn't"],
      responses: [
        "Thank you. I know earning it will take more than words.",
        "I understand. I still wanted you to know that I mean it.",
      ],
    },
    {
      type: "text" as const,
      question:
        "What's one thing we could do differently as we move into the next chapter?",
      placeholder: "Say what would make the next chapter better…",
      response: "I'll carry that with me into whatever comes next.",
    },
    {
      type: "choice" as const,
      question: "What should we make more room for in our next chapter?",
      answers: ["New places", "More laughter", "All of the above"],
      responses: [
        "There are so many places still waiting for us.",
        "More laughter sounds like a beautiful plan.",
        "All of it—and so much more.",
      ],
    },
    {
      type: "choice" as const,
      question:
        "Would you like to see what the next step is from here after all ups and downs ?",
      answers: ["Yes, show me", "No, not yet"],
      responses: [
        "Then let's take the next step together.",
        "That's okay. There is no need to rush your heart.",
      ],
    },
  ],
  note: {
    eyebrow: "BEFORE THE LAST QUESTION",
    paragraphs: [
      "I wanted a chance to show you that I realized my imperfections and I want to love you better than I ever did.",
      "I'd love to drown in the sea of love just for you.",
    ],
  },
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
  dodgeLabel: "No, I won't",
  dodgeMessages: [
    "Hmm... that answer doesn't seem to be working. Try again.",
    "The No button is having second thoughts.",
    "Even the button wants another chapter.",
    "It slipped away again. The Yes button is much friendlier.",
  ],
  yesMessage: `Date accepted! ${PARTNER_NAME} + ${PLAYER_NAME} — our next chapter begins. ♥`,
};
