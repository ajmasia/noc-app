interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SucccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  // INFO:dependecies injection
  constructor(
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

      this.SuccessCallback();
      return true;
    } catch (error) {
      this.ErrorCallback(`${error}`);

      return false;
    }
  }
}
