# Sardine Dashboard

Codebase for sardine dashboard

## Development without docker

### NODE

We use `volta` to manage `node` and `npm` version. Install [volta](https://docs.volta.sh/guide/getting-started). After installing, re-open your terminal. Volta will take care of handling required `npm`, and `node` version from now

### Google cloud

- Install gloud CLI SDK https://cloud.google.com/sdk/docs/install
- Execute `gcloud auth application-default login` to login to GCP if you have not, this will give you default credentials file
  on your local.
- Now do `gcloud config set project indigo-computer-272415`
- Then `gcloud auth login`
- To verify if logged in to gcp do `gcloud auth list`

### ENV variables

Add env variables to your profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`)

```
export GOOGLE_APPLICATION_CREDENTIALS="<path-to-your-service-account>"
export GOOGLE_CLOUD_PROJECT="indigo-computer-272415"
```

### Install dependencies and Link shared package

To install all dependencies, and link the shared `shared` package, from root run

```bash
  sh install.sh
```

### Database setup

If you install Postgresql from Homebrew then you need to create `postgresql` role.

```
/usr/local/opt/postgres/bin/createuser -s postgres
```

You must have postgres server running on localhost:5432
with root user postgres and db postgres. Run following command for one time setup of database

```bash
  sh scripts/setup-db.sh
```

Please take a look at Your machine's `pg_hba.conf`. If you are using Mac, it should be in `/usr/local/var/postgres/pg_hba.conf`.

METHODs should be `trust` in your local `pg_hba.conf`. If `scram-sha-256` or other setting is used, please change it to `trust`.

Trouble shooting FAQ: https://www.notion.so/sardine/FAQ-on-DB-9513ccff0423462eaac7ee887fa89f38

Running migrations

```bash
  cd server && npm run migrate_up_all
```

Manually insert seed data

```
INSERT INTO "public"."superadmin_emails" ("id", "email") VALUES
(1, '<your email>');
```

To start the development server using concurrently

```bash
  npm run start-services
```

### Prisma setup

To use Prisma(ORM) locally you need to set `DATABASE_URL`. please put `.env` file in `/server`.

```server/.env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB (Preview) and CockroachDB (Preview).
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL="postgresql://postgres:@localhost:5432/sardinedb?schema=public&connection_limit=1"
```

Prisma automatically detects `.env` file in `/server` and set `DATABASE_URL`.
server/.env should be ignored by git. Please check .gitignore.

Also, to use Prisma you need to generate the Prisma client. Please run the following command after running `npm install` in `server`

```
cd server
npm run generate-prisma-client
```

This command creates `@prisma/client` in `server/node_modules/.prisma/client`.

[Prisma: Generating the client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)

### Connect to proxy servers for local development

You need to set the environment variable `AUTH_SERVICE_ENDPOINT` and `RULE_ENGINE_ENDPOINT` unless you use the auth service and the rule engine service running in your local machine.

Create `local.json` under `./server/config` with this contents:

```
{
  "AUTH_SERVICE_ENDPOINT": "http://34.70.12.90:9000",
  "RULE_ENGINE_ENDPOINT": "http://34.70.12.90:9100"
}
```

If you want to connect to your own Auth service, or Rule service instance, remove the according field in the `local.json` file. Environment variables defined in `./server/config/default.json` are used.

If you are interested in our auth service, please take a look at [sardine-all/auth-service](https://github.com/sardine-ai/sardine-all/tree/master/src/go/cmd/auth-service).

The environment variables are managed by [node-config](https://github.com/lorenwest/node-config).

### Setup above proxy servers (in case they are down)

Above proxy server is running in our GCP project. If it's down for whatever reason, ask someone with GCP project access to do below:

```
# SSH into remote server
gcloud compute ssh --zone "us-central1-a" "giact-staging" --project "indigo-computer-272415"

# In SSH session, check if any screen session is there (expect empty)
screen -ls

# Create new screen session
screen -S authservice-proxy

# Start proxy (once proxy starts, use ctrl+a&d to detach)
mitmdump -p 9000 --set block_global=false --mode reverse:http://as.auth-service-forwarding-rule.il4.us-central1.lb.indigo-computer-272415.internal

# Do same for rules engine
screen -S rules-proxy
mitmdump -p 9100 --set block_global=false --mode reverse:http://re.rules-engine-forwarding-rule.il4.us-central1.lb.indigo-computer-272415.internal

# Now ctrl+a&d to detach, ctrl+d to close SSH
```

## Filtering log

You can filter the stdout and stderr using `pino-filter` by the following command.

```
npm run dev-filter-log
```

You can change the pino-filter configuration by editing `pino-filter-log.json`: https://github.com/pinojs/pino-filter
