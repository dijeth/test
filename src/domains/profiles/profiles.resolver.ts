import { CompanyProfile } from "@/domains/company-profiles/company-profile.model";
import { PersonalAccount } from "@/domains/personal-accounts/personal-account.model";
import { PrismaService } from "@/prisma/prisma.service";
import { Profile } from "@/domains/profiles/profile.model";
import { Project } from "@/domains/projects/project.model";
import { Skill } from "@/domains/skills/skill.model";
import { Injectable } from "@nestjs/common";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { ProfilesDataloaderService } from "./profiles-dataloader.service";

@Injectable()
@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataloader: ProfilesDataloaderService,
  ) {}

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
    return this.dataloader.skills.load(profile.id);
  }

  @ResolveField(() => [CompanyProfile], { name: "experiences" })
  companyProfiles(@Parent() profile: Profile) {
    return this.dataloader.companyProfiles.load(profile.id);
  }

  @ResolveField(() => [PersonalAccount])
  personalAccounts(@Parent() profile: Profile) {
    return this.dataloader.personalAccounts.load(profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.dataloader.projects.load(profile.id);
  }
}
