import { EmailService } from "../../presentation/email/email.service";
import { LogEntity, LogLevel } from "../models/log";
import { LogRepository } from "../repositories/log";

interface SebdLogsByEmail {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendLogsByEmail implements SebdLogsByEmail {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRespository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sentResult = await this.emailService.sendMailWithSystemLogs(to);

      if (!sentResult) {
        throw new Error("Failed to send email");
      }

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogLevel.HIGH,
        origin: "send-logs-by-email",
      });

      this.logRespository.saveLog(log);
      return false;
    }
  }
}
