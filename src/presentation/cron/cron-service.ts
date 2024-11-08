import { CronJob } from "cron";

type CronTime = string | Date;
type CronAction = () => void;

// INFO: this service works as presentation adapter
export class CronService {
  static createJob(time: CronTime, action: CronAction) {
    const job = new CronJob(time, action);

    job.start();

    return job;
  }
}
