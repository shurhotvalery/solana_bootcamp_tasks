//Load keypair
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

console.log(`Loading keypairs, using an env file!`);

const keyp1 = getKeypairFromEnvironment("S_KEY1");
console.log(`Public key is: ${keyp1.publicKey.toBase58()}`);

const keyp2 = getKeypairFromEnvironment("S_KEY2");
console.log(`Public key is: ${keyp2.publicKey.toBase58()}`);