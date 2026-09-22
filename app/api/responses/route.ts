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
        `<tr><td style="padding:14px 0;border-bottom:1px solid #f0dfe5"><strong style="color:#422a36">${index + 1}. ${escapeHtml(item.question)}</strong><br><span style="display:inline-block;margin-top:6px;color:#765b69;line-height:1.6">${escapeHtml(item.answer).replace(/\n/g, "<br>")}</span></td></tr>`,
    )
    .join("");

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
        html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#422a36"><h1 style="font-family:Georgia,serif">The Next Chapter</h1><p>Her September 29 game responses:</p><table style="border-collapse:collapse;width:100%">${answerRows}</table><p><strong>Date choice:</strong> ${escapeHtml(dateChoice)}</p><p><strong>Final answer:</strong> ${escapeHtml(finalAnswer)}</p></div>`,
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
