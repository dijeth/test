import { ConfigService } from "@/config/config.service";
import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { PrismaQueryCounter } from "@/prisma/prisma-query-counter";
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

type LogLevel = Prisma.LogLevel;
type PrismaOptions = Prisma.PrismaClientOptions & {
  log: { emit: "event"; level: LogLevel }[];
};

const QUERY_LOG_LEVEL: Prisma.LogLevel = "query";

@Injectable()
export class PrismaService
  extends PrismaClient<PrismaOptions, LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger("Prisma");

  constructor(
    private readonly config: ConfigService,
    private readonly queryCounter: PrismaQueryCounter,
  ) {
    const levels = config.get("PRISMA_LOG");
    const log = [QUERY_LOG_LEVEL, ...levels].map((level) => ({
      emit: "event" as const,
      level,
    }));
    super({
      adapter: new PrismaBetterSqlite3({ url: config.get("DATABASE_URL") }),
      log,
    });

    if (levels.includes("query")) {
      this.$on("query", (e) =>
        this.logger.log(`${e.query} -- params: ${e.params} (${e.duration}ms)`),
      );
    }
    if (levels.includes("info"))
      this.$on("info", (e) => this.logger.log(e.message));
    if (levels.includes("warn"))
      this.$on("warn", (e) => this.logger.warn(e.message));
    if (levels.includes("error"))
      this.$on("error", (e) => this.logger.error(e.message));

    this.$on("query", () => this.queryCounter.increment());
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
