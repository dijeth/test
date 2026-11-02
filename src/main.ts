import { NestFactory } from "@nestjs/core";
import "dotenv/config";
import "reflect-metadata";
import { register } from "tsconfig-paths";

async function bootstrap() {
  register({ baseUrl: __dirname, paths: { "@/*": ["*"] } });
  const { AppModule } = await import("@/app.module");
  const { ConfigService } = await import("@/config/config.service");
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const host = config.get("HOST");
  const port = config.get("PORT");
  await app.listen(port, host);
  console.log(`GraphQL sandbox: http://${host}:${port}/graphql`);
}
bootstrap();
