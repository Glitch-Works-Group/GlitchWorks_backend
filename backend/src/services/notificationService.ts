import nodemailer from "nodemailer";
import { AppError } from "../middleware/errorHandler";

export interface SendNotificationInput {
  to: string;
  subject: string;
  text: string;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM;
    if (!host || !user || !pass || !from) {
      throw new AppError(
        503,
        "SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM.",
        "SMTP_NOT_CONFIGURED"
      );
    }
    const secure = String(process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
  return transporter;
}

export async function sendNotification(
  input: SendNotificationInput
): Promise<{ ok: true; messageId: string }> {
  const { to, subject, text } = input;
  if (!to?.trim() || !subject?.trim() || !text?.trim()) {
    throw new AppError(400, "Missing to, subject, or text", "VALIDATION_ERROR");
  }
  const transport = getTransporter();
  const from = process.env.SMTP_FROM!;
  const info = await transport.sendMail({ from, to, subject, text });
  return { ok: true, messageId: info.messageId };
}
