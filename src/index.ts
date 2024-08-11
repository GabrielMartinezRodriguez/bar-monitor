import { createPublicClient, http, parseAbi } from "viem";
import { chiliz } from "viem/chains";

// Configuration
const BAR_TOKEN_ADDRESS = "0xfd3c73b3b09d418841dd6aff341b2d6e3aba433b";
const BLOCKS_TO_SCAN = 1000;

// Add the addresses you want to monitor here
const ADDRESSES_TO_MONITOR: string[] = [
  // Example: "0x1234567890123456789012345678901234567890",
  // Add more addresses as needed
];

const abi = parseAbi([
  "event Transfer(address indexed from, address indexed to, uint256 value)",
]);

const client = createPublicClient({
  chain: chiliz,
  transport: http(),
});

async function monitorBAR() {
  const latestBlock = await client.getBlockNumber();
  const fromBlock = latestBlock - BigInt(BLOCKS_TO_SCAN);

  const logs = await client.getLogs({
    address: BAR_TOKEN_ADDRESS,
    event: abi[0],
    fromBlock,
    toBlock: latestBlock,
  });

  const relevantTransactions = logs.filter(
    (log) =>
      ADDRESSES_TO_MONITOR.includes(log.args.from as string) ||
      ADDRESSES_TO_MONITOR.includes(log.args.to as string)
  );

  console.log(`Scanning blocks from ${fromBlock} to ${latestBlock}`);
  console.log(`Found ${relevantTransactions.length} relevant transactions:`);

  relevantTransactions.forEach((tx, index) => {
    console.log(`
      Transaction Hash: ${tx.transactionHash}:
      Block: ${tx.blockNumber}
      From: ${tx.args.from}
      To: ${tx.args.to}
      Value: ${tx.args.value}
    `);
  });
}

monitorBAR().catch((error) => {
  console.error("An error occurred during execution:", error);
});
