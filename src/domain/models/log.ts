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

// INFO: this is refactored version
export class LogEntity {
  constructor(
    public level: LogLevel,
    public message: string,
    public createdAt: Date = new Date(),
  ) {}
}
