
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


# Concept of Cache Invalidation in Redis

Cache invalidation is the process of removing or updating cached data when the underlying data changes, ensuring that applications do not serve stale or outdated information.

### Why is Cache Invalidation Important?
- **Consistency:** Ensures users always receive the most up-to-date data.
- **Efficiency:** Prevents unnecessary database queries by only updating cache when needed.
- **Correctness:** Avoids serving incorrect or obsolete data from cache.

### Common Cache Invalidation Strategies

1. **Time-Based Expiry (TTL):**
    - Set a time-to-live (TTL) on cache keys using the `EXPIRE` command.
    - After the TTL expires, Redis automatically removes the key.
    - Example:
      ```sh
      SET user:123:name "Alice"
      EXPIRE user:123:name 3600  # Expires in 1 hour
      ```
    - Disadvantages: 
        - Risk of serving stale data

2. **Manual Invalidation:**
    - Explicitly delete or update cache keys when the underlying data changes.
    - Example:
      ```sh
      DEL user:123:name
      ```

3. **Direct / Immediate Invalidation:**
    - Programmatically invalidate cache entries as soon as a specific user action occurs, giving full control to the application.
    - Common in REST APIs where cache is invalidated immediately after a POST/PUT/DELETE request.
    - Example:
      ```python
      # After updating user data via API
      redis.delete(f"user:{user_id}:name")
      ```
    - Disadvantages:
        - Can increase load on the cache server
        - May require complex retry logic to ensure consistency

4. **Write-Through / Write-Behind:**
    - Update both the cache and the database simultaneously (write-through).
    - Or, update the database first and then invalidate or update the cache (write-behind).

5. **Cache Aside (Lazy Loading):**
    - Application checks cache first; if not found, loads from database and updates cache.
    - When data changes, invalidate or update the relevant cache entry.

### Example: Cache Aside Pattern in Redis (Pseudocode)
```python
def get_user(user_id):
     user = redis.get(f"user:{user_id}")
     if user is None:
          user = db.query_user(user_id)
          redis.set(f"user:{user_id}", user, ex=3600)
     return user

def update_user(user_id, new_data):
     db.update_user(user_id, new_data)
     redis.delete(f"user:{user_id}")  # Invalidate cache
```

### Best Practices
- Always invalidate or update cache after modifying the underlying data.
- Use TTLs to prevent stale data from persisting indefinitely.
- Choose the invalidation strategy that best fits your application's consistency and performance needs.

For more details, see the [Redis documentation on key expiration](https://redis.io/docs/manual/key-expiry/).


# Redis Eviction Policies

When Redis runs out of memory, it uses eviction policies to decide which keys to remove to make space for new data. The eviction policy you choose affects cache hit rates, memory usage, and application behavior.

### Common Eviction Policies

- **noeviction**: (Default) Returns an error when memory limit is reached and the client tries to insert more data.
- **allkeys-lru**: Removes the least recently used (LRU) key from all keys.
- **volatile-lru**: Removes the least recently used key from keys with an expiration set.
- **allkeys-random**: Removes a random key from all keys.
- **volatile-random**: Removes a random key from keys with an expiration set.
- **volatile-ttl**: Removes the key with the nearest expiration time (TTL) among keys with an expiration set.

### How to Set an Eviction Policy

You can set the eviction policy in your `redis.conf` file or via the command line:

```sh
redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
```

Or in `redis.conf`:

```
maxmemory 256mb
maxmemory-policy allkeys-lru
```

### Choosing the Right Policy

- Use **allkeys-lru** for general caching to maximize cache hit rate.
- Use **volatile-lru** if only a subset of keys have TTLs and you want to evict only those.
- Use **noeviction** if you want to avoid accidental data loss (but risk errors on writes).

For more details, see the [Redis eviction policy documentation](https://redis.io/docs/management/cache/eviction/).

# Redis Data Persistence

Redis supports multiple persistence options to ensure data durability and recovery after restarts or failures.

## Persistence Mechanisms

- **RDB (Redis Database Backup):**  
    Periodically saves a snapshot of your dataset to disk. Fast and compact, but may lose recent data if Redis crashes.

- **AOF (Append Only File):**  
    Logs every write operation received by the server. Provides better durability but can be slower and result in larger files.

- **Hybrid Approach:**  
    You can enable both RDB and AOF for a balance between performance and durability.

## Configuring Persistence

You can configure persistence in `redis.conf`:

```
save 900 1
save 300 10
appendonly yes
```

- `save` lines configure RDB snapshots (e.g., after 10 changes in 300 seconds).
- `appendonly yes` enables AOF.

For more, see the [Redis persistence documentation](https://redis.io/docs/management/persistence/).

# Redis Security Basics

Redis is designed to be accessed by trusted clients inside trusted environments. By default, it has minimal security features.

## Security Recommendations

- **Bind to localhost** or use firewalls to restrict access.
- **Set a password** using the `requirepass` directive in `redis.conf`.
- **Disable dangerous commands** with the `rename-command` option.
- **Use TLS/SSL** for encrypted connections if needed.

For more, see the [Redis security documentation](https://redis.io/docs/management/security/).

# Redis Pub/Sub

Redis supports publish/subscribe messaging, allowing clients to broadcast messages to multiple subscribers in real time.

## Example

```sh
# In one terminal (subscriber)
redis-cli SUBSCRIBE news

# In another terminal (publisher)
redis-cli PUBLISH news "Hello, Redis Pub/Sub!"
```

Pub/Sub is useful for notifications, chat systems, and real-time updates.

# Redis Transactions

Redis supports transactions using the `MULTI`, `EXEC`, `DISCARD`, and `WATCH` commands, allowing you to execute multiple commands atomically.

## Example

```sh
MULTI
INCR counter
INCR counter
EXEC
```

For more, see the [Redis transactions documentation](https://redis.io/docs/manual/transactions/).