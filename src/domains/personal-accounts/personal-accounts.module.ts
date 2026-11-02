import { Module } from '@nestjs/common';
import { PersonalAccountsResolver } from '@/domains/personal-accounts/personal-accounts.resolver';
import { ProfilesModule } from '@/domains/profiles/profiles.module';

@Module({
  imports: [ProfilesModule],
  providers: [PersonalAccountsResolver],
})
export class PersonalAccountsModule {}
