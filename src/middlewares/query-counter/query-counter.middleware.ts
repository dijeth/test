import { Injectable, NestMiddleware } from "@nestjs/common";
import { PrismaQueryCounter } from "../../prisma/prisma-query-counter";

@Injectable()
export class QueryCounterMiddleware implements NestMiddleware {
  constructor(private readonly prismaQueryCounter: PrismaQueryCounter) {}

  use(req: any, res: any, next: () => void) {
    this.prismaQueryCounter.run((store) => {
      res.on("finish", () => {
        console.log(
          `${req.method} ${req.originalUrl}: ${store.count} DB queries`,
        );
      });

      next();
    });
  }
}
