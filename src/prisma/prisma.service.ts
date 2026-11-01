import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client';

type LogLevel = Prisma.LogLevel;
type PrismaOptions = Prisma.PrismaClientOptions & {
  log: { emit: 'event'; level: LogLevel }[];
};

@Injectable()
export class PrismaService
  extends PrismaClient<PrismaOptions, LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('Prisma');

  constructor(config: ConfigService) {
    const levels = config.get('PRISMA_LOG');
    const log = levels.map((level) => ({ emit: 'event' as const, level }));
    super({
      adapter: new PrismaPg({ connectionString: config.get('DATABASE_URL') }),
      log,
    });

    if (levels.includes('query')) {
      this.$on('query', (e) =>
        this.logger.log(`${e.query} -- params: ${e.params} (${e.duration}ms)`),
      );
    }
    if (levels.includes('info')) this.$on('info', (e) => this.logger.log(e.message));
    if (levels.includes('warn')) this.$on('warn', (e) => this.logger.warn(e.message));
    if (levels.includes('error')) this.$on('error', (e) => this.logger.error(e.message));
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
