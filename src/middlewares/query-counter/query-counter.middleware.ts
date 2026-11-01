import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { PrismaQueryCounter } from "../../prisma/prisma-query-counter";

@Injectable()
export class QueryCounterMiddleware implements NestMiddleware {
  private readonly logger = new Logger("QueryCounterMiddleware");
  constructor(private readonly prismaQueryCounter: PrismaQueryCounter) {}

  use(req: any, res: any, next: () => void) {
    this.prismaQueryCounter.run((store) => {
      res.on("finish", () => {
        this.logger.log(
          `${req.method} ${req.originalUrl}: ${store.count} DB queries`,
        );
      });

      next();
    });
  }
}
