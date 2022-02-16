# Scaffoling notes:

## The Stack and Tools

1. Web server: [Node & Express](https://expressjs.com/)
2. Development database: [PostgreSQL 14](https://www.postgresql.org/download/)
3. Dev database Graphical-User Interface tool: [pgAdmin 4](https://www.pgadmin.org/download/)
4. Dev database Command-Line Interface tool: [psql](https://www.postgresql.org/docs/14/app-psql.html)

**Note:** **pgAdmin 4** and **psql** should be bundled with the PostgreSQL installer, but they might not be the latest versions.

5. Production cloud service: [Heroku](https://id.heroku.com/login)
6. Prod database: [Heroku Postgres Addon](https://devcenter.heroku.com/articles/heroku-postgresql)
7. Prod Command-Line Interface tool: [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Important Postgres Options

You must use the pgAdmin 4 GUI to create the development database by hand. Once the database exists and shows up in pgAdmin 4 you can connect to it using Knex and migrate it.

In production, we create the database by installing the Postgres Addon from the dashboard of our app on the Heroku website. You can connect pgAdmin 4 to the production db following [these instructions](https://stackoverflow.com/a/63046594/3895791).

## Installation of PostgreSQL on the Development Machine

Install [Postgres](https://www.postgresql.org/download/) on your computer, taking into account that getting psql and pgAdmin 4 up and running might require a bit of research and effort.

1. Leave the default options during the Postgres installation wizard (components, location, port number).
2. You will be asked to create a password for the superadmin "postgres" db user. Enter a simple string using only letters (e.g. "password").
3. No need to execute the "Stack Builder" at the end of the installation. You can safely uncheck that and exit the wizard.
4. The first time you open pgAdmin 4 you will be asked to create another password, this time a master password to be able to use pgAdmin.

## Scripts

- **start** Runs the app with Node.
- **server** Runs the app with Nodemon.
- **migrate:dev** Migrates the local development db to the latest.
- **rollback:dev** Rolls back migrations in the local dev db.
- **seed:dev** Truncates all tables in the local dev db.
- **deploy** Deploys the main branch to Heroku. Must login to the Heroku CLI and add Heroku as a remote.
- **test** Runs tests.
- **migrate:prod** Migrates the Heroku database to the latest.
- **rollback:prod** Rolls back migrations in the Heroku database.
- **databaseh** Interacts with the Heroku database from the command line using psql.
- **seed:prod** Runs all seeds in the Heroku database.

## Tips

- Figure out deployment before writing any additional code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If you want to edit a migration that has already been released but don't want to lose all of the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin on their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing a `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.

