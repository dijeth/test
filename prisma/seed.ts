import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  faker.seed(42);

  await prisma.profileSkill.deleteMany();
  await prisma.project.deleteMany();
  await prisma.companyProfile.deleteMany();
  await prisma.personalAccount.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.company.deleteMany();

  await prisma.skill.createMany({
    data: [
      "TypeScript",
      "NestJS",
      "GraphQL",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "React",
      "Python",
    ].map((name) => ({ name })),
  });
  await prisma.company.createMany({
    data: Array.from({ length: 5 }, () => ({ name: faker.company.name() })),
  });

  const skills = await prisma.skill.findMany();
  const companies = await prisma.company.findMany();

  for (let i = 0; i < 10; i++) {
    const startDate = faker.date.past({ years: 8 });
    const current = faker.datatype.boolean();
    const profile = await prisma.profile.create({
      data: {
        name: faker.person.fullName(),
        description: faker.person.jobTitle() + ". " + faker.lorem.sentence(),
        skills: {
          create: faker.helpers
            .arrayElements(skills, { min: 2, max: 5 })
            .map((s) => ({ skillId: s.id })),
        },
        companyProfiles: {
          create: faker.helpers
            .arrayElements(companies, { min: 1, max: 3 })
            .map((c) => ({
              companyId: c.id,
              position: faker.person.jobTitle(),
              startDate,
              endDate: current
                ? null
                : faker.date.between({ from: startDate, to: new Date() }),
              responsibilities: faker.lorem.sentences(2),
            })),
        },
        personalAccounts: {
          create: [
            { link: `https://github.com/${faker.internet.username()}` },
            { link: `https://linkedin.com/in/${faker.internet.username()}` },
          ],
        },
      },
      include: { companyProfiles: true },
    });

    await prisma.project.createMany({
      data: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => {
        const companyProfile = faker.helpers.arrayElement(
          profile.companyProfiles,
        );
        return {
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          repository: `https://github.com/${faker.internet.username()}/${faker.lorem.slug(2)}`,
          companyProfileId: companyProfile.id,
        };
      }),
    });
  }
  console.log(`Seeded ${await prisma.profile.count()} profiles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
