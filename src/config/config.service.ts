import { Inject, Injectable } from '@nestjs/common';
import { AppConfig } from './env.schema';

export const APP_CONFIG = Symbol('APP_CONFIG');

@Injectable()
export class ConfigService {
  constructor(@Inject(APP_CONFIG) private readonly config: AppConfig) {}

  get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }
}
