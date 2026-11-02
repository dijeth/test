import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";
import { validateEnv } from "./config/env.schema";
import { PrismaClient } from "./generated/prisma/client";

const config = validateEnv(process.env);
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: config.DATABASE_URL }),
});

const profileName = "Дмитрий Александрович Орлов";
const skills = [
  "TypeScript",
  "Node.js",
  "NestJS",
  "PHP",
  "Laravel",
  "Inertia.js",
  "Vue.js",
  "React",
];

const experiences = [
  {
    companyName: "Группа компаний Mercury",
    position: "Fullstack-разработчик (part-time)",
    startDate: new Date(Date.UTC(2019, 5, 1)),
    endDate: null,
    responsibilities: `Создал и развиваю внутреннюю платформу для публикации интерактивных продуктовых каталогов на сайтах компании. Отвечаю за архитектуру, модель данных, backend, frontend и инфраструктуру.

Заменил ручную вёрстку статичных каталогов админ-панелью, в которой менеджеры самостоятельно создают и публикуют интерактивные каталоги. Создал API — единый источник данных о брендах и магазинах для сайтов, рекламных лендингов и подготовки полиграфии. Разработал систему коротких ссылок и переадресации для маркетинговых кампаний. Спроектировал интеграцию с iOS-приложением с сохранением веб-аналитики и возвратом на веб-версию каталога, если приложение недоступно. Разрабатываю инструменты автоматической генерации email-рассылок и лендингов. Администрирую Linux-серверы, развёртываю и сопровождаю приложения.
`,
    projects: [
      {
        name: "Платформа интерактивных продуктовых каталогов",
        description: `Внутренняя платформа Mercury для создания и публикации интерактивных каталогов, управления данными о брендах и магазинах, короткими ссылками и интеграцией с iOS-приложением.           
Стек: PHP, Laravel, MySQL, TypeScript, Inertia.js, Vue, S3, Docker, Linux.`,
      },
    ],
  },
  {
    companyName: "StartBlock.Online",
    position: "Backend / Fullstack-разработчик (part-time)",
    startDate: new Date(Date.UTC(2022, 1, 1)),
    endDate: new Date(Date.UTC(2026, 2, 31)),
    responsibilities: `Проектировал событийно-ориентированные и микросервисные backend-системы на NestJS/Node.js, реляционные и key-value схемы данных, а также REST и AsyncAPI контракты. Разрабатывал интеграции с блокчейн-сетями (Stellar, Ethereum, Solana, Cosmos SDK/CometBFT), Kafka, RabbitMQ, SOAP-сервисами и API социальных сетей. Участвовал в разработке ODM/ORM поверх LevelDB и адаптированного Merkle Patricia Trie (EthereumJS Trie), а также off-chain-консенсуса между узлами-валидаторами. Реализовал параллельную обработку live- и ретроспективных потоков блокчейн-данных с Kafka и пакетными транзакциями через Prisma. Разработал отказоустойчивый конвейер импорта данных из SOAP-систем с оркестрацией в Apache Airflow. Создавал административные интерфейсы на Refine, React и Ant Design. Настраивал unit, integration и e2e тестирование, CI/CD в GitHub Actions и проводил кросс-ревью.
`,
    projects: [
      {
        name: "ContentDAO",
        description:
          "Распределённая Web3-платформа для рекламных кампаний между брендами и создателями контента. Координирует подбор блогеров с анализом профилей в соцсетях, проверку выполнения заданий и выплаты вознаграждений. MVP достиг 1000+ зарегистрированных пользователей и нескольких активных кампаний. Стек: TypeScript, Node.js, NestJS, Prisma, PostgreSQL, Jest, React, Refine, Stellar SDK.",
      },
      {
        name: "GemView",
        description:
          "Блокчейн-эксплорер корпоративной сети на Cosmos SDK для мониторинга, аналитики и просмотра транзакций, блоков и валидаторов. Стек: TypeScript, Node.js, NestJS Microservices, Prisma, CockroachDB, Kafka, Redis, CometBFT, Cosmos SDK, React, Jest, Cucumber, Playwright, GitHub Actions.",
      },
      {
        name: "Распределённая система доверенного обмена данными в энергетике",
        description:
          "Децентрализованная платформа для верифицируемого обмена коммерческими данными между участниками розничного энергорынка с криптографической проверкой целостности на Merkle Patricia Trie (EthereumJS Trie). Покрытие тестами — 92% строк кода. Стек: TypeScript, Node.js, NestJS Microservices, RabbitMQ, LevelDB, Jest.",
      },
      {
        name: "Система автоматизированного сбора данных электроучёта",
        description:
          "Интеграционная платформа для регулярного сбора, валидации и нормализации данных приборов учёта из асинхронных SOAP-источников регионального масштаба: 1,5 млн приборов и более 150 млн значений за цикл. Стек: TypeScript, Node.js, Express, TypeORM, PostgreSQL, Redis, Airflow, Docker, SOAP, Jest.",
      },
    ],
  },
];

async function main() {
  await prisma.$transaction(async (tx) => {
    let profile = await tx.profile.findFirst({
      where: { name: profileName },
      orderBy: { id: "asc" },
    });

    const description = `Backend / Fullstack-разработчик. С 2019 года в веб-разработке с уклоном в backend на Node.js. Ранее разрабатывал геоинформационные системы и автоматизировал полиграфические процессы, включая плагины для Adobe InDesign, Photoshop и Illustrator.

Образование: Пермский национальный исследовательский политехнический университет, электротехнический факультет, специальность «Автоматизированные системы обработки информации и управления», 1999 год.
Дополнительные проекты: интернет-магазин фототоваров https://shx.ru и внутренняя система управления email- и SMS-рассылками для DailyGrow. Использует AI-инструменты в разработке.`;

    if (profile) {
      profile = await tx.profile.update({
        where: { id: profile.id },
        data: { description },
      });

      const oldCompanyProfiles = await tx.companyProfile.findMany({
        where: { profileId: profile.id },
        select: { id: true },
      });
      const oldCompanyProfileIds = oldCompanyProfiles.map(({ id }) => id);

      await tx.project.deleteMany({
        where: { companyProfileId: { in: oldCompanyProfileIds } },
      });
      await tx.companyProfile.deleteMany({ where: { profileId: profile.id } });
      await tx.profileSkill.deleteMany({ where: { profileId: profile.id } });
      await tx.personalAccount.deleteMany({ where: { profileId: profile.id } });
    } else {
      profile = await tx.profile.create({
        data: { name: profileName, description },
      });
    }

    for (const skillName of skills) {
      let skill = await tx.skill.findFirst({ where: { name: skillName } });
      if (!skill) {
        skill = await tx.skill.create({ data: { name: skillName } });
      }
      await tx.profileSkill.create({
        data: { profileId: profile.id, skillId: skill.id },
      });
    }

    await tx.personalAccount.createMany({
      data: [
        { link: "https://github.com/dijeth", profileId: profile.id },
        { link: "https://github.com/dijeth-dev", profileId: profile.id },
        { link: "https://t.me/dijeth", profileId: profile.id },
        { link: "d.orlov777@gmail.com", profileId: profile.id },
      ],
    });

    for (const experience of experiences) {
      let company = await tx.company.findFirst({
        where: { name: experience.companyName },
      });
      if (!company) {
        company = await tx.company.create({
          data: { name: experience.companyName },
        });
      }

      const companyProfile = await tx.companyProfile.create({
        data: {
          companyId: company.id,
          profileId: profile.id,
          position: experience.position,
          startDate: experience.startDate,
          endDate: experience.endDate,
          responsibilities: experience.responsibilities,
        },
      });

      await tx.project.createMany({
        data: experience.projects.map((project) => ({
          ...project,
          companyProfileId: companyProfile.id,
        })),
      });
    }
  });

  console.log(`Seeded resume profile: ${profileName}`);
}

main()
  .catch((error: unknown) => {
    console.error("Failed to seed resume profile:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
