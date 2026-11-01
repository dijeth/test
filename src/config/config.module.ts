import { Global, Module } from '@nestjs/common';
import { APP_CONFIG, ConfigService } from '@/config/config.service';
import { validateEnv } from '@/config/env.schema';

@Global()
@Module({
  providers: [
    { provide: APP_CONFIG, useFactory: () => validateEnv(process.env) },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
