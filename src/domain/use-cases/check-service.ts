import { LogEntity, LogLevel } from "../models/log";
import { LogRepository } from "../repositories/log";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SucccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  // INFO:dependecies injection from presentation layer
  constructor(
    private readonly logRepository: LogRepository,
    private readonly SuccessCallback: SucccessCallback,
    private readonly ErrorCallback: ErrorCallback,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // INFO: throw errow goes to catch block
        throw new Error(`Service is down: ${url}`);
      }

      const log = new LogEntity(LogLevel.LOW, `Service is up: ${url}`);

      this.logRepository.saveLog(log);
      this.SuccessCallback && this.SuccessCallback();
      return true;
    } catch (error) {
      const log = new LogEntity(LogLevel.LOW, `Service is down: ${url}`);

      this.logRepository.saveLog(log);
      this.ErrorCallback && this.ErrorCallback(`${error}`);

      return false;
    }
  }
}
