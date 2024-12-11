import nodemailer from "nodemailer";
import { env } from "../../config/adapters/envs.adapter";
import { LogRepository } from "../../domain/repositories/log";
import { LogEntity, LogLevel } from "../../domain/models/log";

interface Attachment {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.MAILER_EMAIL,
      pass: env.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments } = options;

    try {
      const sendMailInformation = await this.transporter.sendMail({
        from: env.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      const log = new LogEntity({
        level: LogLevel.LOW,
        message: `Email sent`,
        origin: "email-service",
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogLevel.LOW,
        message: `Email not sent`,
        origin: "email-service",
      });

      return false;
    }
  }

  async sendMailWithSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = "System logs";
    const htmlBody = "<h1>System logs</h1>";

    const attachments = [
      {
        filename: "system-logs.log",
        path: "./logs/logs-low.log",
      },
    ];

    try {
      return this.sendEmail({ to, subject, htmlBody, attachments });
    } catch (error) {
      return false;
    }
  }
}
