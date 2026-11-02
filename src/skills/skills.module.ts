import { Module } from '@nestjs/common';
import { SkillsDataloaderService } from '@/skills/skills-dataloader.service';
import { SkillsResolver } from '@/skills/skills.resolver';

@Module({ providers: [SkillsResolver, SkillsDataloaderService] })
export class SkillsModule {}
