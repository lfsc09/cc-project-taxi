# Taxi Project

## Initialize Node project

```bash
npm install
```

## Run the project

### For developing

```bash
# To run only de DB container
docker compose --profile dev up --build --detach
npm run dev
```

## Build

```bash
docker compose --profile prod up --build --detach
```

```bash
docker compose down
```

_Access project on `127.0.0.1` if inside `WSL2`._
