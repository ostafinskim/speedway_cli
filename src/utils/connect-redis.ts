import { createClient } from 'redis';

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';

const redis_client = createClient({
    url: redis_url,
});

const connect_redis = async () => {
    try {
        await redis_client.connect();
        console.log(`Redis connected to ${redis_url}`);
        redis_client.set(
            'speedway_cli',
            'Here is a test message from redis client.',
        );
    } catch (error) {
        console.log(error);
        setTimeout(connect_redis, 5000);
    }
};

connect_redis();

export default redis_client;
