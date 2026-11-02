import { Profile } from "@/domains/profiles/profile.model";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [Profile])
  profiles?: Profile[];
}
