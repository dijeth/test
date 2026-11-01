import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

prisma.profile
  .findMany({
    where: { id: { in: [11, 12, 13] } },
    select: { id: true, skills: { select: { skill: true } } },
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  });
