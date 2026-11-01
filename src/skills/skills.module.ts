import { Module } from '@nestjs/common';
import { SkillsResolver } from '@/skills/skills.resolver';

@Module({ providers: [SkillsResolver] })
export class SkillsModule {}
