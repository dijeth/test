import { Module } from '@nestjs/common';
import { CompanyProfilesModule } from '@/company-profiles/company-profiles.module';
import { ProjectsResolver } from '@/projects/projects.resolver';

@Module({
  imports: [CompanyProfilesModule],
  providers: [ProjectsResolver],
})
export class ProjectsModule {}
