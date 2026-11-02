import { Module } from '@nestjs/common';
import { CompaniesDataloaderService } from '@/domains/companies/companies-dataloader.service';
import { CompaniesResolver } from '@/domains/companies/companies.resolver';

@Module({
  providers: [CompaniesResolver, CompaniesDataloaderService],
  exports: [CompaniesDataloaderService],
})
export class CompaniesModule {}
