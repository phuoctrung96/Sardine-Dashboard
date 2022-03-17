# Server

## Setup

All setup steps are written on `device-dashboard/README.md`

## API schema

You can get the TypeScript definitions of API schema of Sardine services by https://github.com/drwpow/openapi-typescript

Sardine services, such as rulesengine and auth service, have API schema defined by Swagger (OpenAPI).

As the [README](https://github.com/drwpow/openapi-typescript) says, please follow the steps.

```
cd somewhere/sardine-all-is-located-at
cd go-to-the-directory/where-swagger-yaml-is-in
npx openapi-typescript swagger.yaml --output schema.ts
```

Then, copy `schema.ts` and paste it as `server/api-schema/some-schema-name.ts`.

## Name convention

- Folder: kebab-case
- File: kebab-case
- Interface: PascalCase
- Variable: camelCase
- Function: camelCase

## DOs and DON'Ts

### DB and Prisma

#### DO

- Consider normalizing tables.
- Add NOT NULL constraints.
- Add UNIQUE constraints to columns which must have unique values.
- Add index to columns which have high cardinality.
