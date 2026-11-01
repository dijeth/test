import { Module } from '@nestjs/common';
import { CompanyProfilesResolver } from '@/company-profiles/company-profiles.resolver';

@Module({ providers: [CompanyProfilesResolver] })
export class CompanyProfilesModule {}
