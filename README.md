# sqs-tester

Just a random tool to insert stuff into sqs and test different concurrent scenarios

Make sure you have exported correct AWS credentials as ENV variables before running

```
aws-azure-login --profile login --mode=gui
$(aws-export-assume-profile flaconi-lite-dev)
```

Then make sure you copy .env.example to .env and fill correct values.

Afterward your session lives for ~=1 hour and you can execute the program
```
yarn start
```

To modify the payloads sent or the frequency or concurrency just adjust the `start` function at `src/index.ts`
