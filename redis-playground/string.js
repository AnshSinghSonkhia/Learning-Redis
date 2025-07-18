const client = require('./client')

async function init() {
    // await client.set("role:5", "ceo");

    // await client.expire("role:5", 60);   // key will expire in 60 seconds

    const result = await client.get("role:5");
    console.log("Result -> ", result);
}

init();