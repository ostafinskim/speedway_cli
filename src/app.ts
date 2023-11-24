require('dotenv').config();
import express, { Response } from 'express';
import config from 'config';
import validate_env from './utils/validate-env';
import { PrismaClient } from '@prisma/client';
import redis_client from './utils/connect-redis';

validate_env();

const prisma = new PrismaClient();
const app = express();

async function main() {
    // test route
    app.get('/api/health', async (_, res: Response) => {
        const data = await redis_client.get('speedway_cli');
        res.status(200).json({ status: 'success', message: data });
    });

    const port = config.get<number>('port');
    app.listen(port, () => {
        console.log(`Server listening on port http://localhost:${port}`);
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
