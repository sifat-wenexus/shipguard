export abstract class ThemeSupport {
  abstract id: string;
  abstract name: string;
  abstract versions: string[];

  abstract check(): Promise<boolean> | boolean;
}
