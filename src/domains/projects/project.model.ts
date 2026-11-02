import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CompanyProfile } from '@/domains/company-profiles/company-profile.model';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  repository?: string | null;

  @Field(() => Int)
  companyProfileId: number;

  @Field(() => CompanyProfile)
  companyProfile: CompanyProfile;
}
