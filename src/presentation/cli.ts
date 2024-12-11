import { env } from "../config/adapters/envs.adapter";
import { CheckService } from "../domain/use-cases/check-service";
import { SendLogsByEmail } from "../domain/use-cases/send-logs-by-email";
import { FileSystemDataSource } from "../infra/datasouces/filesystem.datasource";
import { LogRepositoryImplementation } from "../infra/repositories/logs.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

export class CLI {
  public static start() {
    console.log("health: NOC cli started");

    const fileSystemRepository = new LogRepositoryImplementation(
      new FileSystemDataSource(),
    );
    const mailService = new EmailService();

    !env.CRON_JOBS && console.log("Cron jobs are disabled");
    !env.SEND_EMAIL && console.log("Send email is disabled");

    env.CRON_JOBS &&
      CronService.createJob("*/5 * * * * *", () => {
        const url = "http://google.com";

        const fileSystemDataSource = new FileSystemDataSource();
        const fileSystemLogRepository = new LogRepositoryImplementation(
          fileSystemDataSource,
        );

        new CheckService(
          fileSystemLogRepository,
          () => console.log(`Service is up: ${url}`),
          (error) => console.log(error),
        ).execute(url);
      });

    env.SEND_EMAIL &&
      new SendLogsByEmail(mailService, fileSystemRepository).execute([
        "dragonishdev@gmail.com",
      ]);
  }
}
