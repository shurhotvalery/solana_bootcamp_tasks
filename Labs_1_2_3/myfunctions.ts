import {getKeypairFromEnvironment} from "@solana-developers/helpers";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export function getPublicKeyFromEnv(name, tobase58=true) {
    const keyp = getKeypairFromEnvironment(name);
    return tobase58 ? keyp.publicKey.toBase58() : keyp.publicKey;
}

export async function getBalance(key_str, connection){
    const publicKey = new PublicKey(key_str);
    const balInLamp = await connection.getBalance(publicKey);
    const balInSOL = balInLamp / LAMPORTS_PER_SOL;
    console.log(`The balance for the wallet at address ${publicKey} is ${balInSOL} SOL or ${balInLamp} Lamports`);
    return balInSOL;
}