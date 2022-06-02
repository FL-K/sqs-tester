import * as fs from 'fs';

import dotenv from 'dotenv';

import { SQSClient } from './sqs';

dotenv.config();

(async () => {
    await start();
})();

async function start() {
    const sqsClient = new SQSClient();

    const p = [];

    p.push(
        sqsClient.sendMessageToSQS(
            process.env.QUEUE_URL as string,
            JSON.parse(fs.readFileSync('payloads/pending.json').toString()),
        ),
    );

    p.push(
        sqsClient.sendMessageToSQS(
            process.env.QUEUE_URL as string,
            JSON.parse(fs.readFileSync('payloads/charged.json').toString()),
        ),
    );

    await Promise.all(p)
        .then(value => {
            console.log(value);
        })
        .catch(reason => console.error(reason));
}
