export enum LogLevel {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

// export class LogEntity {
//   public level: LogLevel;
//   public message: string;
//   public createdAt: Date;
//
//   constructor(level: LogLevel, message: string) {
//     this.level = level;
//     this.message = message;
//     this.createdAt = new Date();
//   }
// }

interface LogEntityProps {
  level: LogLevel;
  message: string;
  createdAt?: Date;
  origin?: string;
}

// INFO: this is refactored version
export class LogEntity {
  public level: any;
  public message: any;
  public createdAt: any;
  public origin: any;

  constructor(options: LogEntityProps) {
    const { level, message, createdAt, origin } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt || new Date();
    this.origin = origin || "core";
  }

  start() {
    console.log('starter method')
  }
}
