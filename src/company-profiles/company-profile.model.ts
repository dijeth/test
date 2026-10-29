import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Company } from '../companies/company.model';
import { Profile } from '../profiles/profile.model';

@ObjectType()
export class CompanyProfile {
  @Field(() => Int)
  companyId: number;

  @Field(() => Int)
  profileId: number;

  @Field()
  position: string;

  @Field(() => GraphQLISODateTime)
  startDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date | null;

  @Field(() => String, { nullable: true })
  responsibilities?: string | null;

  @Field(() => Company)
  company?: Company;

  @Field(() => Profile)
  profile?: Profile;
}
