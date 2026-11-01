import { Injectable, Scope } from "@nestjs/common";
import DataLoader from "dataloader";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { CompanyProfile } from "@/company-profiles/company-profile.model";
import { PersonalAccount } from "@/personal-accounts/personal-account.model";
import { PrismaService } from "@/prisma/prisma.service";
import { Skill } from "@/skills/skill.model";
import { Profile } from "@/profiles/profile.model";

// Request scope: DataLoader's cache and batches must not outlive a single request.
@Injectable({ scope: Scope.REQUEST })
@Resolver(() => Profile)
export class ProfilesResolver {
  private readonly skillsLoader = new DataLoader<number, Skill[]>(
    async (ids) => {
      const rows = await this.prisma.profile.findMany({
        where: { id: { in: [...ids] } },
        select: { id: true, skills: { select: { skill: true } } },
      });
      const byId = new Map(
        rows.map((r) => [r.id, r.skills.map(({ skill }) => skill)]),
      );
      return ids.map((id) => byId.get(id) ?? []);
    },
  );

  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Profile])
  profiles() {
    return this.prisma.profile.findMany({ orderBy: { id: "asc" } });
  }

  @Query(() => Profile, { nullable: true })
  profile(@Args("id", { type: () => ID }) id: string) {
    return this.prisma.profile.findUnique({ where: { id: Number(id) } });
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return this.skillsLoader.load(profile.id);
  }

  @ResolveField(() => [CompanyProfile])
  companyProfiles(@Parent() profile: Profile) {
    return this.prisma.companyProfile.findMany({
      where: { profileId: profile.id },
      orderBy: { startDate: "desc" },
    });
  }

  @ResolveField(() => [PersonalAccount])
  personalAccounts(@Parent() profile: Profile) {
    return this.prisma.personalAccount.findMany({
      where: { profileId: profile.id },
      orderBy: { id: "asc" },
    });
  }
}
