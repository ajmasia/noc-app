import { LogEntity, LogLevel } from "../models/log";

// export abstract class LogDataSource {
//   abstract saveLog(log: LogEntity): Promise<void>;
//   abstract getLogs(severityLevel: LogLevel): Promise<LogEntity[]>;
// }

// INFO: implementation using an interface
// INFO: each datasource implementation must implement this interface
export interface LogDataSource {
  saveLog(log: LogEntity): Promise<void>;
  getLogs(severityLevel: LogLevel): Promise<LogEntity[]>;
}
