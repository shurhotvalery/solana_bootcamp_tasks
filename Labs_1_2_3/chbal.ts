//Check balance
import "dotenv/config";
import { getKeypairFromEnvironment, airdropIfRequired } from "@solana-developers/helpers";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getBalance, getPublicKeyFromEnv } from "./myfunctions";

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Connected to ${connection.rpcEndpoint}`);

const pk1 = getPublicKeyFromEnv('S_KEY1');
const pk2 = getPublicKeyFromEnv('S_KEY2');

// Відправте трошки SOL
// Або скористайтеся краном Solana: https://faucet.solana.com/
// Або використайте функцію airdropIfRequired().....

getBalance(pk1, connection);
getBalance(pk2, connection);