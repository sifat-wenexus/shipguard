export class QueryException extends Error {
  constructor(public readonly message: string, public readonly code: string) {
    super(message);
    this.name = 'QueryException';
  }
}
