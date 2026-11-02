import { Module } from '@nestjs/common';
import { CompaniesModule } from '@/companies/companies.module';
import { CompanyProfilesDataloaderService } from '@/company-profiles/company-profiles-dataloader.service';
import { CompanyProfilesResolver } from '@/company-profiles/company-profiles.resolver';
import { ProfilesModule } from '@/profiles/profiles.module';

@Module({
  imports: [CompaniesModule, ProfilesModule],
  providers: [CompanyProfilesResolver, CompanyProfilesDataloaderService],
  exports: [CompanyProfilesDataloaderService],
})
export class CompanyProfilesModule {}
