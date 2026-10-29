import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from '../profiles/profile.model';
import { Skill } from './skill.model';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Skill])
  skills() {
    return this.prisma.skill.findMany({ orderBy: { id: 'asc' } });
  }

  @Query(() => Skill, { nullable: true })
  skill(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.skill.findUnique({ where: { id: Number(id) } });
  }

  @ResolveField(() => [Profile])
  profiles(@Parent() skill: Skill) {
    return this.prisma.profile.findMany({
      where: { skills: { some: { skillId: skill.id } } },
      orderBy: { id: 'asc' },
    });
  }
}
