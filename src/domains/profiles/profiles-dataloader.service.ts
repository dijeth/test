import type { CompanyProfile, Project } from "@/generated/prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import {
  createByIdLoader,
  createGroupedLoader,
} from "@/utils/dataloader-fabric";
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class ProfilesDataloaderService {
  constructor(private readonly prisma: PrismaService) {}

  public readonly byId = createByIdLoader((ids) =>
    this.prisma.profile.findMany({ where: { id: { in: [...ids] } } }),
  );

  public readonly skills = createGroupedLoader(
    (ids) =>
      this.prisma.profileSkill.findMany({
        where: { profileId: { in: [...ids] } },
        include: { skill: true },
        orderBy: { skillId: "asc" },
      }),
    (row) => row.profileId,
    (row) => row.skill,
  );

  public readonly personalAccounts = createGroupedLoader(
    (ids) =>
      this.prisma.personalAccount.findMany({
        where: { profileId: { in: [...ids] } },
        orderBy: { link: "asc" },
      }),
    (row) => row.profileId,
    (row) => row,
  );

  public readonly companyProfiles = createGroupedLoader(
    (ids) =>
      this.prisma.companyProfile.findMany({
        where: { profileId: { in: [...ids] } },
        orderBy: { startDate: "desc" },
      }),
    (row) => row.profileId,
    (row): CompanyProfile => row,
  );

  public readonly projects = createGroupedLoader(
    (ids) =>
      this.prisma.project.findMany({
        where: { companyProfile: { profileId: { in: [...ids] } } },
        include: { companyProfile: { select: { profileId: true } } },
      }),
    (row) => row.companyProfile.profileId,
    ({ companyProfile, ...project }): Project => project,
  );
}
