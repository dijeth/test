import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CompaniesModule } from "@/domains/companies/companies.module";
import { CompanyProfilesModule } from "@/domains/company-profiles/company-profiles.module";
import { ConfigModule } from "@/config/config.module";
import { QueryCounterMiddleware } from "@/middlewares/query-counter/query-counter.middleware";
import { PersonalAccountsModule } from "@/domains/personal-accounts/personal-accounts.module";
import { PrismaModule } from "@/prisma/prisma.module";
import { ProfilesModule } from "@/domains/profiles/profiles.module";
import { ProjectsModule } from "@/domains/projects/projects.module";
import { SkillsModule } from "@/domains/skills/skills.module";

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      introspection: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    }),
    PrismaModule,
    ProfilesModule,
    SkillsModule,
    CompaniesModule,
    CompanyProfilesModule,
    ProjectsModule,
    PersonalAccountsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(QueryCounterMiddleware).forRoutes("graphql");
  }
}
