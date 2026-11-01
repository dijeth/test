import { Module } from '@nestjs/common';
import { CompaniesResolver } from '@/companies/companies.resolver';

@Module({ providers: [CompaniesResolver] })
export class CompaniesModule {}
