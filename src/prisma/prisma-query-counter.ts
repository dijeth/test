import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "node:async_hooks";

@Injectable()
export class PrismaQueryCounter {
  private readonly als = new AsyncLocalStorage<{ count: number }>();

  run<T>(fn: (store: { count: number }) => T): T {
    return this.als.run({ count: 0 }, () => {
      return fn(this.als.getStore()!);
    });
  }

  increment() {
    const store = this.als.getStore();
    if (store) {
      store.count++;
    }
  }

  get count() {
    return this.als.getStore()?.count ?? 0;
  }
}
