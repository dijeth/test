import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CompaniesDataloaderService } from '@/companies/companies-dataloader.service';
import { Company } from '@/companies/company.model';
import { Profile } from '@/profiles/profile.model';
import { ProfilesDataloaderService } from '@/profiles/profiles-dataloader.service';
import { Project } from '@/projects/project.model';
import { CompanyProfile } from '@/company-profiles/company-profile.model';
import { CompanyProfilesDataloaderService } from '@/company-profiles/company-profiles-dataloader.service';

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
