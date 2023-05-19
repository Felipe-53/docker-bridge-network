## Docker Bridge Network

The setup described here could easily be produced with Docker stacks. The ideia is to do it manually to get a better understanding of how Docker works behind the scenes.

### What this is

Manual setup of a user-defined bridge network to allow networking communication between a Node.js backend service and a PostgreSQL database.

## How to run

### Create the network

```bash
docker network create node-postgres
```

### Init the PostgreSQL service

```bash
docker run \
  -e POSTGRES_PASSWORD=secret \
  --net node-postgres \
  --name db \
  --hostname db \
  -v "$(pwd)"/init.sql:/docker-entrypoint-initdb.d/init.sql \
  -d postgres
```

### Build the Node.js image

```bash
docker build -t node-app .
```

### Run the Node.js service

```bash
docker container run \
  -e DATABASE_URL=postgresql://postgres:secret@db:5432/test \
  --name node-app \
  --net node-postgres \
  -p 3500:3500 \
  node-app
```

### Curl it!

```bash
curl localhost:3500
```
