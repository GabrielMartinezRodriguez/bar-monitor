# BAR MONITOR

This code snippet monitors $BAR token finding transaction where `from` or `to` are one of the transactions provided in the `ADDRESSES_TO_MONITOR` variable.

## Quick start

```bash
yarn
yarn build
yarn start
```

## Posible improvements

This is a list of possible improvements, but not all of them are compatible with each other. The context in which the monitor is going to be deployed is crucial for determining which improvements apply and whether it's worth investing the resources for the benefit they will provide

- Implement a test suite and a code formatter.
- Split the code into different files for better organization.
- Implement error handling and retries for network requests.
- Create a configuration file to easily manage environment-specific settings
- Deploy to a cloud service and implement a continuous monitoring system:
  - Instead of querying the RPC each time a user wants to retrieve data, monitor the blockchain for every new block and save all transactions interacting with the contract we're monitoring in a database, such as MongoDB
  - When a user requests transaction data, retrieve it from the database instead of querying the blockchain RPC.
- Deploy a dedicated RPC node to ensure the reliability and integrity of blockchain data.
- Utilize a service like Alchemy to set up webhook notifications for $BAR token transactions:
  - Configure the service to send notifications for each relevant transaction.
  - Save these notifications in a database for future querying
  - Implement a message queue, such as RabbitMQ, to process the notifications.
- For critical systems, implement transaction signature verification:
  - This doesn't guarantee execution but adds an extra layer of security against potentially malicious RPCs.
