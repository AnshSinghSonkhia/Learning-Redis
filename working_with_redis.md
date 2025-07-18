# Installing Redis using Docker

## Running Redis with Docker

To quickly get Redis up and running using Docker, use the following command:

```bash
docker run -d --name redis-stack \
    -p 6379:6379 -p 8001:8001 \
    redis/redis-stack:latest
```

This will start a Redis container named `redis-stack`, exposing the default Redis port (`6379`) and the RedisInsight UI port (`8001`).

### Start Redis

If your container is stopped, you can start it again with:

```bash
docker start redis-stack
```

### Access the Redis CLI

To open the Redis command-line interface inside the running container:

```bash
docker exec -it redis-stack redis-cli
```

Try running these commands in the CLI:

```bash
PING
SET name "Sonkhia"
GET name
```

- `PING` should return `PONG`.
- `GET name` should return `"Sonkhia"`.

---

## Key Naming Convention

A common convention is to use `<entity>:<id>` as the key format. For example:

```bash
SET user:1 Ansh
SET user:2 Aakash
SET user:3 Agni
```

This approach helps organize related data and makes retrieval easier.

---

## Getting & Setting Strings

- `SET`: Set the value of a key.

```bash
SET city "Delhi"
```

- `SET NX`: Set the value only if the key does not exist.

```bash
SET city "Mumbai" NX
```

- `SET XX`: Set the value only if the key already exists.

```bash
SET city "Chennai" XX
```

- `GET`: Get the value of a key.

```bash
GET city
```

- `MGET`: Get the values of multiple keys.

For example, after setting multiple users:

```bash
SET user:1 Ansh
SET user:2 Aakash
SET user:3 Agni
```

You can retrieve all their values at once:

```bash
MGET user:1 user:2 user:3
```

This will return:

```
1) "Ansh"
2) "Aakash"
3) "Agni"
```

## Incrementing & Decrementing Count

You can use Redis commands to increment or decrement numeric values stored at a key.

- `INCR`: Increments the integer value of a key by one.

```bash
SET counter 10
INCR counter
```

After running these commands, `counter` will be `11`.

- `DECR`: Decrements the integer value of a key by one.

```bash
DECR counter
```

Now, `counter` will be `10`.

- `INCRBY` and `DECRBY`: Increment or decrement by a specific amount.

```bash
INCRBY counter 5
DECRBY counter 3
```

After these, `counter` will be `12`.

These commands are atomic and useful for counting operations, such as tracking page views or user actions.

# NPM Package to interact with Redis:

```bash
npm i ioredis
```