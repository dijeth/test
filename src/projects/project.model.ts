import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from '../profiles/profile.model';

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
  profileId: number;

  @Field(() => Profile)
  profile?: Profile;
}
