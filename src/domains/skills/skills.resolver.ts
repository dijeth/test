import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@/prisma/prisma.service';
import { Profile } from '@/domains/profiles/profile.model';
import { Skill } from '@/domains/skills/skill.model';
import { SkillsDataloaderService } from '@/domains/skills/skills-dataloader.service';

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataloader: SkillsDataloaderService,
  ) {}

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
    return this.dataloader.profiles.load(skill.id);
  }
}
