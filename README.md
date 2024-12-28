# Taxi Project

## Initialize Node project

```bash
npm install
```

## Run the project

### For developing

```bash
# To run only de DB container
docker compose --profile dev up --build --detach --renew-anon-volumes
npm run dev
```

```bash
docker compose --profile dev down
```

## Build

```bash
docker compose --profile prod up --build --detach --renew-anon-volumes
```

```bash
docker compose --profile prod down
```

_Access project on `127.0.0.1` if inside `WSL2`._
