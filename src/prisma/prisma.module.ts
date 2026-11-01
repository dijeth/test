import { Global, Module } from "@nestjs/common";
import { PrismaQueryCounter } from "./prisma-query-counter";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService, PrismaQueryCounter],
  exports: [PrismaService, PrismaQueryCounter],
})
export class PrismaModule {}
