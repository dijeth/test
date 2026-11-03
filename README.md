# Тестовое задание

Мини-приложение на базе NestJS и GraphQL, предоставляющее read-only-доступ к данным через GraphQL Sandbox от Apollo.

- **Слой данных:** SQLite (для простоты развёртывания) через ORM Prisma.
- **Сетевой слой:** NestJS с GraphQL.

Для сокращения количества запросов к БД и решения проблемы N+1 реализованы request-scoped сервисы с DataLoader. Они объединяют множество однотипных запросов к БД в один и кешируют результаты (в пределах одного GraphQL-запроса).

Чтобы сократить дублирование кода, в сервисный слой добавлены две утилитарные функции — фабрики DataLoader: для загрузки одиночных сущностей и загрузки групп сущностей.

Для упрощения контроля количества SQL-запросов, выполняемых в рамках одного GraphQL-запроса, добавлен небольшой сервисный класс [`PrismaQueryCounter`](src/prisma/prisma-query-counter.ts), работающий на базе `AsyncLocalStorage` из Node.js. Инициализация нового асинхронного контекста происходит в middleware NestJS.

## Итоговый поток данных:

`Запрос → GraphQL Resolver → request-scoped DataLoader-сервис → Prisma → SQLite`

## Схема базы данных

ER-диаграмма доступна в [`ERD.md`](ERD.md). Источник истины — Prisma-схема [`prisma/schema.prisma`](prisma/schema.prisma).

## Сигнатуры фабрик DataLoader

Из [`src/utils/dataloader-fabric.ts`](src/utils/dataloader-fabric.ts):

```ts
declare function createByIdLoader<Row extends { id: number }>(
  loadRows: (ids: number[]) => Promise<Row[]>,
): DataLoader<number, Row>;

declare function createGroupedLoader<Row, Item>(
  loadRows: (ids: number[]) => Promise<Row[]>,
  getId: (row: Row) => number,
  getItem: (row: Row) => Item,
): DataLoader<number, Item[]>;
```

## Пример dataloader-сервиса

[`src/domains/profiles/profiles-dataloader.service.ts`](src/domains/profiles/profiles-dataloader.service.ts)

```ts
@Injectable({ scope: Scope.REQUEST })
export class ProfilesDataloaderService {
  constructor(private readonly prisma: PrismaService) {}

  public readonly byId = createByIdLoader(...);
  public readonly skills = createGroupedLoader(...);
  public readonly personalAccounts = createGroupedLoader(...);
  public readonly companyProfiles = createGroupedLoader(...);
  public readonly projects = createGroupedLoader(...);
}
```
