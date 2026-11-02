import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@/prisma/prisma.service';
import { Profile } from '@/profiles/profile.model';
import { ProfilesDataloaderService } from '@/profiles/profiles-dataloader.service';
import { PersonalAccount } from '@/personal-accounts/personal-account.model';

@Resolver(() => PersonalAccount)
export class PersonalAccountsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profilesLoader: ProfilesDataloaderService,
  ) {}

  @Query(() => [PersonalAccount])
  personalAccounts() {
    return this.prisma.personalAccount.findMany({ orderBy: { id: 'asc' } });
  }

  @Query(() => PersonalAccount, { nullable: true })
  personalAccount(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.personalAccount.findUnique({ where: { id: Number(id) } });
  }

  @ResolveField(() => Profile)
  profile(@Parent() account: PersonalAccount) {
    return this.profilesLoader.byId.load(account.profileId);
  }
}
