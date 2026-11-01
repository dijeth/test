import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Profile } from '@/profiles/profile.model';

@ObjectType()
export class PersonalAccount {
  @Field(() => ID)
  id: number;

  @Field()
  link: string;

  @Field(() => Int)
  profileId: number;

  @Field(() => Profile)
  profile?: Profile;
}
