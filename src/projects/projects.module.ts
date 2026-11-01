import { Module } from '@nestjs/common';
import { ProjectsResolver } from '@/projects/projects.resolver';

@Module({ providers: [ProjectsResolver] })
export class ProjectsModule {}
