import { Module } from '@nestjs/common';
import { PersonalAccountsResolver } from './personal-accounts.resolver';

@Module({ providers: [PersonalAccountsResolver] })
export class PersonalAccountsModule {}
