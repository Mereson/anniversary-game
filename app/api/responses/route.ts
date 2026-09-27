import { NextResponse } from "next/server";

const DEFAULT_RECIPIENT = "chimeremnmaojinta@gmail.com";
const DEFAULT_SENDER = "onboarding@resend.dev";
const MAX_ANSWER_LENGTH = 600;
const MAX_QUESTIONS = 20;

type Submission = {
  answers?: { question?: unknown; answer?: unknown }[];
  dateChoice?: unknown;
  finalAnswer?: unknown;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ] ?? character,
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RESEND_TO_EMAIL ?? DEFAULT_RECIPIENT;
  const sender = process.env.RESEND_FROM_EMAIL ?? DEFAULT_SENDER;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  let body: Submission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (
    !Array.isArray(body.answers) ||
    body.answers.length === 0 ||
    body.answers.length > MAX_QUESTIONS
  ) {
    return NextResponse.json(
      { error: "A valid set of answers is required." },
      { status: 400 },
    );
  }

  const answers = body.answers.map((item) => ({
    question:
      typeof item.question === "string"
        ? item.question.trim().slice(0, 300)
        : "",
    answer:
      typeof item.answer === "string"
        ? item.answer.trim().slice(0, MAX_ANSWER_LENGTH)
        : "",
  }));
  if (answers.some((item) => !item.question || !item.answer)) {
    return NextResponse.json(
      { error: "Every question needs an answer." },
      { status: 400 },
    );
  }

  const dateChoice =
    typeof body.dateChoice === "string"
      ? body.dateChoice.slice(0, 100)
      : "Not provided";
  const finalAnswer =
    typeof body.finalAnswer === "string"
      ? body.finalAnswer.slice(0, 100)
      : "Not provided";
  const answerRows = answers
    .map(
      (item, index) =>
        `<tr><td style="padding:0 0 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f1dfe5;border-radius:16px;background:#fffdfc"><tr><td style="padding:20px 22px"><div style="margin-bottom:9px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#cc6d8b">FROM THE HEART · ${String(index + 1).padStart(2, "0")}</div><div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;line-height:1.45;color:#4b2c3b">${escapeHtml(item.question)}</div><div style="margin-top:12px;font-size:15px;line-height:1.7;color:#765b69">${escapeHtml(item.answer).replace(/\n/g, "<br>")}</div></td></tr></table></td></tr>`,
    )
    .join("");
  const emailText = `Yeti completed the September 29 anniversary game.\n\n${answers.map((item, index) => `${index + 1}. ${item.question}\n${item.answer}`).join("\n\n")}\n\nDate choice: ${dateChoice}\nFinal answer: ${finalAnswer}`;
  const emailHtml = `<!doctype html><html><body style="margin:0;padding:0;background:#fdf2f4"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fdf2f4"><tr><td align="center" style="padding:30px 14px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#fffaf8;border:1px solid #f0dfe5;border-radius:24px;overflow:hidden"><tr><td align="center" style="padding:42px 30px 36px;background:#f9e7ec"><div style="font-size:24px;line-height:1;color:#d56283">♥</div><div style="margin-top:16px;font-size:11px;font-weight:700;letter-spacing:2.2px;color:#bd6a84">SEPTEMBER 29 · OUR NEXT CHAPTER</div><h1 style="margin:12px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:1.15;color:#4b2c3b">Yeti’s answers</h1><p style="margin:13px 0 0;font-size:15px;line-height:1.6;color:#876d7b">A little record of what she shared from the heart.</p></td></tr><tr><td style="padding:28px 26px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${answerRows}</table></td></tr><tr><td style="padding:2px 26px 30px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#4b2c3b;border-radius:16px"><tr><td style="padding:21px 22px;color:#fffaf8"><div style="font-size:10px;font-weight:700;letter-spacing:1.7px;color:#eab5c5">WHAT COMES NEXT</div><div style="margin-top:10px;font-size:15px;line-height:1.7"><strong>Date choice:</strong> ${escapeHtml(dateChoice)}<br><strong>Final answer:</strong> ${escapeHtml(finalAnswer)}</div></td></tr></table></td></tr><tr><td align="center" style="padding:0 26px 30px;font-size:12px;line-height:1.6;color:#aa8796">Made with love, for the story still to come&nbsp; ♥</td></tr></table></td></tr></table></body></html>`;

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject: "The Next Chapter — her answers",
        html: emailHtml,
        text: emailText,
      }),
    });
  } catch (error) {
    console.error("Resend request failed", error);
    return NextResponse.json(
      { error: "Email delivery failed." },
      { status: 502 },
    );
  }

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    console.error("Resend delivery failed", response.status, result);
    return NextResponse.json(
      { error: "Email delivery failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ submitted: true, id: result?.id });
}
