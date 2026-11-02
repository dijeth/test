import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Company } from '@/domains/companies/company.model';
import { Profile } from '@/domains/profiles/profile.model';
import { Project } from '@/domains/projects/project.model';

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
