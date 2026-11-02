import { PrismaService } from "@/prisma/prisma.service";
import { createByIdLoader, createGroupedLoader } from "@/utils/dataloader-fabric";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class CompanyProfilesDataloaderService {
  constructor(private readonly prisma: PrismaService) {}

  public readonly byId = createByIdLoader((ids) =>
    this.prisma.companyProfile.findMany({ where: { id: { in: [...ids] } } }),
  );

  public readonly projects = createGroupedLoader(
    (ids) =>
      this.prisma.project.findMany({
        where: { companyProfileId: { in: [...ids] } },
        orderBy: { id: "asc" },
      }),
    (row) => row.companyProfileId,
    (row) => row,
  );
}
