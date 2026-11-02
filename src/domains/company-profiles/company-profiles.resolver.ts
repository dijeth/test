import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CompaniesDataloaderService } from '@/domains/companies/companies-dataloader.service';
import { Company } from '@/domains/companies/company.model';
import { Profile } from '@/domains/profiles/profile.model';
import { ProfilesDataloaderService } from '@/domains/profiles/profiles-dataloader.service';
import { Project } from '@/domains/projects/project.model';
import { CompanyProfile } from '@/domains/company-profiles/company-profile.model';
import { CompanyProfilesDataloaderService } from '@/domains/company-profiles/company-profiles-dataloader.service';

@Resolver(() => CompanyProfile)
export class CompanyProfilesResolver {
  constructor(
    private readonly companiesLoader: CompaniesDataloaderService,
    private readonly profilesLoader: ProfilesDataloaderService,
    private readonly dataloader: CompanyProfilesDataloaderService,
  ) {}

  @ResolveField(() => Company)
  company(@Parent() cp: CompanyProfile) {
    return this.companiesLoader.byId.load(cp.companyId);
  }

  @ResolveField(() => Profile)
  profile(@Parent() cp: CompanyProfile) {
    return this.profilesLoader.byId.load(cp.profileId);
  }

  @ResolveField(() => [Project])
  projects(@Parent() cp: CompanyProfile) {
    return this.dataloader.projects.load(cp.id);
  }
}
