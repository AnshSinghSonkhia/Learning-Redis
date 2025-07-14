
# Learning Redis

[![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white&style=flat-square)](https://redis.io/)

## About Redis
Redis is an `open-source`, `in-memory` `data structure store`, used as a `database`, `cache`, and `message broker`. It supports data structures such as **strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs**, and **geospatial indexes**.

## Why Should We Use Redis?
- **Performance:** Redis stores data in memory, making read and write operations extremely fast.
- **Simplicity:** Easy to set up and use with simple commands.
- **Versatility:** Can be used as a cache, database, and message broker.
- **Scalability:** Supports replication, persistence, and clustering for high availability and scalability.

## Redis's Working Process
Redis keeps the dataset in memory for fast access and periodically saves it to disk for persistence. It uses a single-threaded event loop to handle commands, ensuring atomicity and simplicity. Data can be replicated to slave nodes for redundancy.

## Use-Cases of Redis
- Caching frequently accessed data
- Session management
- Real-time analytics
- Leaderboards and counting
- Pub/Sub messaging
- Queues and job management

## Famous Companies/Products That Use Redis
- Twitter
- GitHub
- Pinterest
- Snapchat
- Stack Overflow
- Craigslist

## Computed Data in Redis
Redis is often used to store computed or derived data, such as counters, rankings, or aggregated statistics, to avoid recalculating them on every request.

## Example: Messaging App (Unread Messages Count)
When a user logs in, the unread messages count is fetched from the main database and stored in Redis for fast access. While the user is active, each new unread message increments the count in both Redis and the database. This ensures real-time updates and consistency, while reducing database load.

## Working with Redis in Windows:
### Installing Redis on Windows

Redis does not officially support Windows, but you can use it via [WSL (Windows Subsystem for Linux)](https://docs.microsoft.com/en-us/windows/wsl/) or Docker.

#### Using WSL

1. **Install WSL**  
    Open PowerShell as Administrator and run:
    ```sh
    wsl --install
    ```

2. **Install Redis in WSL**  
    Open your WSL terminal and run:
    ```sh
    sudo apt update
    sudo apt install redis-server
    ```

3. **Start Redis**  
    ```sh
    redis-server
    ```

#### Using Docker

1. **Install Docker Desktop**  
    Download and install from [Docker's website](https://www.docker.com/products/docker-desktop/).

2. **Run Redis Container**  
    ```sh
    docker run --name redis -p 6379:6379 -d redis
    ```

### Connecting to Redis

You can use the Redis CLI or client libraries (like `redis-py` for Python or `redis` for Node.js) to connect to your Redis instance running on `localhost:6379`.

## Redis-Stack

Redis Stack is an enhanced version of Redis that bundles additional modules to extend its capabilities beyond core Redis. It includes features for full-text search, time series data, graph data, JSON documents, and probabilistic data structures.

### Key Modules in Redis Stack
- **RediSearch:** Enables full-text search and secondary indexing.
- **RedisJSON:** Allows storing, querying, and indexing JSON documents.
- **RedisTimeSeries:** Efficiently stores and analyzes time series data.
- **RedisGraph:** Stores and queries graph data using Cypher query language.
- **RedisBloom:** Provides probabilistic data structures like Bloom and Cuckoo filters.

### Installing Redis Stack

You can run Redis Stack using Docker:

```sh
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

- Redis will be available on port `6379`.
- RedisInsight (GUI) will be available on port `8001`.

For more installation options, visit the [Redis Stack documentation](https://redis.io/docs/stack/).

### When to Use Redis Stack?

Use Redis Stack if you need advanced features like search, analytics, or support for complex data types (JSON, time series, graphs) in addition to standard Redis functionality.

## Redis Visualizer

### Visualizing Redis with a GUI

You can use tools like **RedisInsight** or **Another Redis Desktop Manager (RDM)** to visualize and manage your Redis data.

#### Using RedisInsight with Docker

1. **Run RedisInsight via Docker**  
    ```sh
    docker run -d -p 8001:8001 --name redisinsight redislabs/redisinsight
    ```
2. **Access RedisInsight**  
    Open your browser and go to [http://localhost:8001](http://localhost:8001).
3. **Connect to Redis**  
    - Click "Add Redis Database".
    - Enter `localhost` and port `6379` (default).
    - Click "Connect".

#### Using RedisInsight on Localhost

1. **Download RedisInsight**  
    Download from [RedisInsight Downloads](https://redis.com/redis-enterprise/redis-insight/).
2. **Install and Launch**  
    Follow the installation instructions for your OS and open the app.
3. **Connect to Redis**  
    - Click "Add Redis Database".
    - Enter `localhost` and port `6379`.
    - Click "Connect".

You can now browse keys, run commands, and visualize your Redis data easily.



---
Feel free to explore the code and examples in this repository to learn more about Redis!
