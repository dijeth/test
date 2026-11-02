import { Module } from '@nestjs/common';
import { SkillsDataloaderService } from '@/domains/skills/skills-dataloader.service';
import { SkillsResolver } from '@/domains/skills/skills.resolver';

@Module({ providers: [SkillsResolver, SkillsDataloaderService] })
export class SkillsModule {}
