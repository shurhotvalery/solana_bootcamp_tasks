//Send Solana
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    Connection, SystemProgram, clusterApiUrl,
    LAMPORTS_PER_SOL, PublicKey,
    Transaction, TransactionInstruction, sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getPublicKeyFromEnv } from "./myfunctions";

const connection = new Connection(clusterApiUrl("devnet"));

/*Sender   */ const keyp1 = getKeypairFromEnvironment("S_KEY1");
/*Recipient*/ const keyp2 = getKeypairFromEnvironment("S_KEY2");
const pk1 = getPublicKeyFromEnv('S_KEY1');
const pk2 = getPublicKeyFromEnv('S_KEY2');

const sol = 0.12;
console.log(`Attempting to send ${sol} SOL from ${pk1} to ${pk2}...`);

const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: keyp1.publicKey,
    toPubkey: keyp2.publicKey,
    lamports: sol * LAMPORTS_PER_SOL,
});
transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [keyp1]);
console.log(`Transaction done, signature: ${signature}`);

// Get this address from https://spl.solana.com/memo
// https://solana.com/developers/cookbook/transactions/add-memo
const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

const addMemoInstruction = new TransactionInstruction({
    keys: [{ pubkey: keyp1.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from("This is some MemoInstruction for the transaction", "utf-8"),
    programId: memoProgram,
});

const memoRes = transaction.add(addMemoInstruction);
// console.log(`📝 memo is ${memoText}...`, memoRes);
const signature2 = await sendAndConfirmTransaction(connection, transaction, [keyp1]);
console.log(`Transaction done, signature: ${signature2}`);