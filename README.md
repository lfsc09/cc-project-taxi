# Taxi Project

## Initialize Node project

```bash
npm install
```

</br>

## Run the project

### For development

Bring up the Database container to run the project correctly.

```bash
# To run only de DB container
docker compose --profile dev up --build --detach --renew-anon-volumes
npm run dev
```

##### Bring down containers

```bash
docker compose --profile dev down
```

</br>

## Run tests

```bash
npm run test-unit # Unit tests
npm run test-integration # Integration tests
npm run test-e2e # E2E tests that hit the endpoints (Must have project running with containers)
```

</br>

## Build

```bash
docker compose --profile prod up --build --detach --renew-anon-volumes
```

```bash
docker compose --profile prod down
```

_Access project on `127.0.0.1` if inside `WSL2`._
