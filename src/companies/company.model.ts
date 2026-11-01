import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CompanyProfile } from '@/company-profiles/company-profile.model';

@ObjectType()
export class Company {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [CompanyProfile])
  companyProfiles?: CompanyProfile[];
}
