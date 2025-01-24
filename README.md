# Taxi Project

## Initialize Node project

```bash
npm install
```

</br>

## Run the project

### For development

If you want to manually use the API, bring up the Database container to run the project correctly.

```bash
# This will bring up only de DB container
docker compose --profile dev up --build --detach --renew-anon-volumes
npm run dev
```

##### Bring down containers

```bash
docker compose --profile dev down && docker volume prune -f
```

</br>

## Run tests

```bash
# Unit tests (Only Domain)
npm run test-unit

# Integration tests (Usecases, with Fakers)
npm run test-integration
```

To run `e2e` tests, that will hit the API endpoints, bring up the DB container first.

_e2e tests will automatically shut on/off the API._

```bash
docker compose --profile dev up --build --detach --renew-anon-volumes
npm run test-e2e
docker compose --profile dev down && docker volume prune -f
```

</br>

## Build

### Automatically

```bash
docker compose --profile prod up --build --detach --renew-anon-volumes
```

```bash
docker compose --profile prod down && docker volume prune -f
```

_Access project on `127.0.0.1` if inside `WSL2`._

### Manually

Project will be built in `./build`.

```bash
npm run build
```

</br>

# What I learned

## For auto Seeding Database for Tests

#### Problem

I tried to seed the database through `Docker`, but it kept giving me errors on the `INSERT`s.

I had a file `postgresql-seed.sql` with the inserts, and it was mapped to the `initdb.d` of the DB image. It ran in the correct order, but I could not figure out why insertions were not working.

#### Solution

I moved the responsability to `Node`, and created the `seed-database.ts` script to run on `test-e2e` npm script just before the tests.

## Npm `test-e2e` problem

#### Problem

I was having trouble initiating the API before running the tests, since the API would take a while until ready. Also I wanted to auto finish the API process after the tests ended.

#### Solution

Using the `concurrently` library helped solve both issues.
