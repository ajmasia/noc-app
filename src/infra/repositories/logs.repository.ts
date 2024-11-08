import { LogDataSource } from "../../domain/datasources/log";
import { LogEntity, LogLevel } from "../../domain/models/log";
import { LogRepository } from "../../domain/repositories/log";

export class LogRepositoryImplementation implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }

  async saveLog(log: LogEntity) {
    return this.logDataSource.saveLog(log);
  }
}
