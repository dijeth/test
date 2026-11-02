import { Module } from '@nestjs/common';
import { CompanyProfilesModule } from '@/domains/company-profiles/company-profiles.module';
import { ProjectsResolver } from '@/domains/projects/projects.resolver';

@Module({
  imports: [CompanyProfilesModule],
  providers: [ProjectsResolver],
})
export class ProjectsModule {}
