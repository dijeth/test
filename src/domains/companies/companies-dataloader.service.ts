import { PrismaService } from "@/prisma/prisma.service";
import { createByIdLoader, createGroupedLoader } from "@/utils/dataloader-fabric";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class CompaniesDataloaderService {
  constructor(private readonly prisma: PrismaService) {}

  public readonly byId = createByIdLoader((ids) =>
    this.prisma.company.findMany({ where: { id: { in: [...ids] } } }),
  );

  public readonly companyProfiles = createGroupedLoader(
    (ids) =>
      this.prisma.companyProfile.findMany({
        where: { companyId: { in: [...ids] } },
        orderBy: { id: "asc" },
      }),
    (row) => row.companyId,
    (row) => row,
  );
}
