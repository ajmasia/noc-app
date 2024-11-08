import { CheckService } from "../domain/use-cases/check-service";
import { FileSystemDataSource } from "../infra/datasouces/filesystem.datasource";
import { LogRepositoryImplementation } from "../infra/repositories/logs.repository";
import { CronService } from "./cron/cron-service";

export class CLI {
  public static start() {
    console.log("health: NOC cli started");

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
  }
}
