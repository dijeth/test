import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Company } from '../companies/company.model';
import { Profile } from '../profiles/profile.model';
import { CompanyProfile } from './company-profile.model';

@Resolver(() => CompanyProfile)
export class CompanyProfilesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Company)
  company(@Parent() cp: CompanyProfile) {
    return this.prisma.company.findUniqueOrThrow({ where: { id: cp.companyId } });
  }

  @ResolveField(() => Profile)
  profile(@Parent() cp: CompanyProfile) {
    return this.prisma.profile.findUniqueOrThrow({ where: { id: cp.profileId } });
  }
}
