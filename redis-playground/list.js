const client = require('./client')

async function init() {
    await client.lpush("messages", "Hello");   
    await client.rpush("messages", "Bye");   

    const result = await client.lrange("messages", 0, -1);
    console.log("Result -> ", result);
}

init();