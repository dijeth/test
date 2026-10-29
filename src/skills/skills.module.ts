import { Module } from '@nestjs/common';
import { SkillsResolver } from './skills.resolver';

@Module({ providers: [SkillsResolver] })
export class SkillsModule {}
