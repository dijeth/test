import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyProfile } from '../company-profiles/company-profile.model';
import { PersonalAccount } from '../personal-accounts/personal-account.model';
import { Skill } from '../skills/skill.model';
import { Profile } from './profile.model';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Profile])
  profiles() {
    return this.prisma.profile.findMany({ orderBy: { id: 'asc' } });
  }

  @Query(() => Profile, { nullable: true })
  profile(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.profile.findUnique({ where: { id: Number(id) } });
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return this.prisma.skill.findMany({
      where: { profiles: { some: { profileId: profile.id } } },
      orderBy: { id: 'asc' },
    });
  }

  @ResolveField(() => [CompanyProfile])
  companyProfiles(@Parent() profile: Profile) {
    return this.prisma.companyProfile.findMany({
      where: { profileId: profile.id },
      orderBy: { startDate: 'desc' },
    });
  }

  @ResolveField(() => [PersonalAccount])
  personalAccounts(@Parent() profile: Profile) {
    return this.prisma.personalAccount.findMany({ where: { profileId: profile.id }, orderBy: { id: 'asc' } });
  }
}
