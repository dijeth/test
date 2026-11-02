import { Module } from '@nestjs/common';
import { PersonalAccountsResolver } from '@/personal-accounts/personal-accounts.resolver';
import { ProfilesModule } from '@/profiles/profiles.module';

@Module({
  imports: [ProfilesModule],
  providers: [PersonalAccountsResolver],
})
export class PersonalAccountsModule {}
