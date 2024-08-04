const { createClient } = require('redis');

exports.initializeRedisClient = async() => {
  const client = await createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  return client;
}
