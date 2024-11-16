import type { Prisma } from '#prisma-client';

export class Transaction {
  constructor(
    public readonly trx: Prisma.TransactionClient,
    private readonly resolve: (v: any) => void,
    private readonly reject: (e: Error) => void
  ) {}

  private _completed = false;

  get completed() {
    return this._completed;
  }

  commit(r: any) {
    if (this._completed) {
      throw new Error('Transaction already completed');
    }

    this._completed = true;

    return this.resolve(r);
  }

  rollback(e: Error) {
    if (this._completed) {
      throw new Error('Transaction already completed');
    }

    this._completed = true;

    return this.reject(e);
  }
}
