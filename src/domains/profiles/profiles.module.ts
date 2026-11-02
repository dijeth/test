import { ProfilesDataloaderService } from "@/domains/profiles/profiles-dataloader.service";
import { ProfilesResolver } from "@/domains/profiles/profiles.resolver";
import { Module } from "@nestjs/common";

@Module({
  providers: [ProfilesResolver, ProfilesDataloaderService],
  exports: [ProfilesDataloaderService],
})
export class ProfilesModule {}
