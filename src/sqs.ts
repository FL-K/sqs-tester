import { randomInt } from 'crypto';

import { SQS, config } from 'aws-sdk';

export const REGION = 'eu-central-1';

export class SQSClient {
    sqs: SQS;

    constructor(sqsOptions: SQS.Types.ClientConfiguration = {}) {
        // Set the region
        config.update({ region: REGION, apiVersion: '2012-11-05' });

        // Create an SQS service object
        this.sqs = new SQS({ ...sqsOptions });
    }

    sendMessageToSQS = (
        queueUrl: string,
        data: {
            reference: string;
            notificationId: string;
        },
    ) => {
        return new Promise((resolve, reject) => {
            this.sqs.sendMessage(
                {
                    MessageGroupId: data.reference,
                    MessageDeduplicationId: data.notificationId,
                    MessageBody: JSON.stringify(data),
                    QueueUrl: queueUrl,
                },
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.MessageId);
                    }
                },
            );
        });
    };
}
