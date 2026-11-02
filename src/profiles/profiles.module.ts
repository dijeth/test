import { ProfilesDataloaderService } from "@/profiles/profiles-dataloader.service";
import { ProfilesResolver } from "@/profiles/profiles.resolver";
import { Module } from "@nestjs/common";

@Module({ providers: [ProfilesResolver, ProfilesDataloaderService] })
export class ProfilesModule {}
