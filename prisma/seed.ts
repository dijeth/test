import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  faker.seed(42);
  await prisma.profile.deleteMany();
  await prisma.profile.createMany({
    data: Array.from({ length: 10 }, () => ({
      name: faker.person.fullName(),
      description: faker.person.jobTitle() + '. ' + faker.lorem.sentence(),
    })),
  });
  console.log(`Seeded ${await prisma.profile.count()} profiles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
