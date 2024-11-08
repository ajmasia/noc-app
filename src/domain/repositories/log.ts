import { LogEntity, LogLevel } from "../models/log";

// export abstract class LogRepository {
//   abstract saveLog(log: LogEntity): Promise<void>;
//   abstract getLogs(severityLevel: LogLevel): Promise<LogEntity[]>;
// }

// INFO: implementation using an interface
// INFO: each log LogRepository implementation must implement this interface
export interface LogRepository {
  saveLog(log: LogEntity): Promise<void>;
  getLogs(severityLevel: LogLevel): Promise<LogEntity[]>;
}
