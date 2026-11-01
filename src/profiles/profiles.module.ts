import { Module } from '@nestjs/common';
import { ProfilesResolver } from '@/profiles/profiles.resolver';

@Module({ providers: [ProfilesResolver] })
export class ProfilesModule {}
