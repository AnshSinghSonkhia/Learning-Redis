
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

---
Feel free to explore the code and examples in this repository to learn more about Redis!
