import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@/prisma/prisma.service';
import { CompanyProfile } from '@/domains/company-profiles/company-profile.model';
import { CompanyProfilesDataloaderService } from '@/domains/company-profiles/company-profiles-dataloader.service';
import { Project } from '@/domains/projects/project.model';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly companyProfilesLoader: CompanyProfilesDataloaderService,
  ) {}

  @Query(() => [Project])
  projects() {
    return this.prisma.project.findMany({ orderBy: { id: 'asc' } });
  }

  @Query(() => Project, { nullable: true })
  project(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.project.findUnique({ where: { id: Number(id) } });
  }

  @ResolveField(() => CompanyProfile)
  companyProfile(@Parent() project: Project) {
    return this.companyProfilesLoader.byId.load(project.companyProfileId);
  }
}
