import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SkillsModule } from './skills/skills.module';
import { CompaniesModule } from './companies/companies.module';
import { CompanyProfilesModule } from './company-profiles/company-profiles.module';
import { ProjectsModule } from './projects/projects.module';
import { PersonalAccountsModule } from './personal-accounts/personal-accounts.module';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      introspection: true,
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
export class AppModule {}
