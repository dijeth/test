import { Module } from '@nestjs/common';
import { CompaniesModule } from '@/domains/companies/companies.module';
import { CompanyProfilesDataloaderService } from '@/domains/company-profiles/company-profiles-dataloader.service';
import { CompanyProfilesResolver } from '@/domains/company-profiles/company-profiles.resolver';
import { ProfilesModule } from '@/domains/profiles/profiles.module';

@Module({
  imports: [CompaniesModule, ProfilesModule],
  providers: [CompanyProfilesResolver, CompanyProfilesDataloaderService],
  exports: [CompanyProfilesDataloaderService],
})
export class CompanyProfilesModule {}
