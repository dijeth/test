import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CompanyProfile } from '@/domains/company-profiles/company-profile.model';
import { PersonalAccount } from '@/domains/personal-accounts/personal-account.model';
import { Skill } from '@/domains/skills/skill.model';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => [Skill])
  skills?: Skill[];

  @Field(() => [CompanyProfile])
  companyProfiles?: CompanyProfile[];

  @Field(() => [PersonalAccount])
  personalAccounts?: PersonalAccount[];
}
