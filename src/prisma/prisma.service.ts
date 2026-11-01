import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { ConfigService } from "../config/config.service";
import { PrismaQueryCounter } from "./prisma-query-counter";

type LogLevel = Prisma.LogLevel;

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger("Prisma");

  constructor(
    private readonly config: ConfigService,
    private readonly queryCounter: PrismaQueryCounter,
  ) {
    const levels = config.get("PRISMA_LOG");
    super({ log: levels.map((level) => ({ emit: "event", level })) });

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
