import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@/prisma/prisma.service';
import { CompaniesDataloaderService } from '@/domains/companies/companies-dataloader.service';
import { CompanyProfile } from '@/domains/company-profiles/company-profile.model';
import { Company } from '@/domains/companies/company.model';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataloader: CompaniesDataloaderService,
  ) {}

  @Query(() => [Company])
  companies() {
    return this.prisma.company.findMany({ orderBy: { id: 'asc' } });
  }

  @Query(() => Company, { nullable: true })
  company(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.company.findUnique({ where: { id: Number(id) } });
  }

  @ResolveField(() => [CompanyProfile])
  companyProfiles(@Parent() company: Company) {
    return this.dataloader.companyProfiles.load(company.id);
  }
}
