import { PrismaService } from "@/prisma/prisma.service";
import { createGroupedLoader } from "@/utils/dataloader-fabric";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class SkillsDataloaderService {
  constructor(private readonly prisma: PrismaService) {}

  public readonly profiles = createGroupedLoader(
    (ids) =>
      this.prisma.profileSkill.findMany({
        where: { skillId: { in: [...ids] } },
        include: { profile: true },
        orderBy: { profileId: "asc" },
      }),
    (row) => row.skillId,
    (row) => row.profile,
  );
}
