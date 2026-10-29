import { z } from 'zod';

export const PRISMA_LOG_LEVELS = ['query', 'info', 'warn', 'error'] as const;

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1)
    .refine((v) => /^postgres(ql)?:\/\//.test(v), 'must be a postgresql:// URL'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  PRISMA_LOG: z
    .string()
    .default('')
    .transform((v) =>
      v
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean),
    )
    .pipe(z.array(z.enum(PRISMA_LOG_LEVELS))),
});

export type AppConfig = Readonly<z.infer<typeof envSchema>>;

export function validateEnv(env: NodeJS.ProcessEnv): AppConfig {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    const details = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${details}`);
  }
  return Object.freeze(result.data);
}
