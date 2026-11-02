import { Module } from '@nestjs/common';
import { CompaniesDataloaderService } from '@/companies/companies-dataloader.service';
import { CompaniesResolver } from '@/companies/companies.resolver';

@Module({
  providers: [CompaniesResolver, CompaniesDataloaderService],
  exports: [CompaniesDataloaderService],
})
export class CompaniesModule {}
