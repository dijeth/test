import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from '../profiles/profile.model';
import { Project } from './project.model';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Project])
  projects() {
    return this.prisma.project.findMany({ orderBy: { id: 'asc' } });
  }

  @Query(() => Project, { nullable: true })
  project(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.project.findUnique({ where: { id: Number(id) } });
  }

  @ResolveField(() => Profile)
  profile(@Parent() project: Project) {
    return this.prisma.profile.findUniqueOrThrow({ where: { id: project.profileId } });
  }
}
