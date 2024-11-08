import { CheckService } from "../domain/use-cases/check-service";
import { CronService } from "./cron/cron-service";

export class CLI {
  public static start() {
    console.log("health: NOC cli started");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "http://google.com";

      new CheckService(
        () => console.log(`Service is up: ${url}`),
        (error) => console.log(error),
      ).execute(url);
    });
  }
}
