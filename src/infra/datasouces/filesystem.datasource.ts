import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log";
import { LogEntity, LogLevel } from "../../domain/models/log";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = "logs/";

  private readonly lowLogsPath: string = "logs/logs-low.log";
  private readonly mediumLogsPath: string = "logs/logs-medium.log";
  private readonly highLogsPath: string = "logs/logs-high.log";

  constructor() {
    this.initializeLogFiles();
  }

  private initializeLogFiles(): void {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.lowLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (logPath) => {
        if (fs.existsSync(logPath)) return;

        fs.writeFileSync(logPath, "");
      },
    );
  }

  private getLogsFromFile(filePath: string): Promise<LogEntity[]> {
    return new Promise((resolve, reject) => {
      const content = fs.readFileSync(filePath, "utf-8");

      if (!content) resolve([]);

      const logs = content.split("\n").map((log) => JSON.parse(log));

      return resolve(logs);
    });
  }

  saveLog(log: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(log)}\n`;

    fs.appendFileSync(this.lowLogsPath, logAsJson);

    if (log.level === LogLevel.LOW) return Promise.resolve();

    if (log.level === LogLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);

      return Promise.resolve();
    }

    if (log.level === LogLevel.HIGH) {
      fs.appendFileSync(this.highLogsPath, logAsJson);

      return Promise.resolve();
    }

    return Promise.reject(new Error("Invalid log level"));
  }

  getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogLevel.LOW:
        return this.getLogsFromFile(this.lowLogsPath);
      case LogLevel.MEDIUM:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogLevel.HIGH:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        return Promise.reject(new Error("Invalid log level"));
    }
  }
}
