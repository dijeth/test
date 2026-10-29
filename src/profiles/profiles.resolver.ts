import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Profile } from './profile.model';
import { CreateProfileInput } from './profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Profile])
  profiles() {
    return this.prisma.profile.findMany({ orderBy: { id: 'asc' } });
  }

  @Query(() => Profile, { nullable: true })
  profile(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.profile.findUnique({ where: { id: Number(id) } });
  }

  @Mutation(() => Profile)
  createProfile(@Args('input') input: CreateProfileInput) {
    return this.prisma.profile.create({ data: input });
  }
}
