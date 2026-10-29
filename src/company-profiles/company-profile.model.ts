import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Company } from '../companies/company.model';
import { Profile } from '../profiles/profile.model';
import { Project } from '../projects/project.model';

@ObjectType()
export class CompanyProfile {
  @Field(() => Int)
  id: number;

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

  @Field(() => [Project])
  projects?: Project[];
}
