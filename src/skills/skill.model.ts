import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Profile } from '../profiles/profile.model';

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Profile])
  profiles?: Profile[];
}
