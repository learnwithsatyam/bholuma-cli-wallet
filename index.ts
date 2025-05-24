import { Keypair, Connection, LAMPORTS_PER_SOL, Transaction, SystemProgram, PublicKey, sendAndConfirmTransaction, clusterApiUrl } from "@solana/web3.js";
import fs from "fs";
import { Command } from "commander";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); // "https://api.devnet.solana.com"
const program = new Command();


function createKeyPair() {
    var keyPair = Keypair.generate();
    fs.writeFileSync("keypair.json", JSON.stringify(keyPair.secretKey));
    console.log("Keypair created and saved to keypair.json");
}

function loadKeyPairFromFile(): Keypair{
    var secret = JSON.parse(fs.readFileSync("keypair.json").toString()) as number[];
    const secretKey = Uint8Array.from(secret);
    return Keypair.fromSecretKey(secretKey);

}

async function airdropSol(){
    var keyPair = loadKeyPairFromFile();
    var airdrop = await connection.requestAirdrop(
        keyPair.publicKey,
        5 * LAMPORTS_PER_SOL
    );
    
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdrop
    });

    console.log("Airdrop completed");   
}

async function balance(){
    var keyPair = loadKeyPairFromFile();
    var balance = await connection.getBalance(keyPair.publicKey);
    console.log("Balance:", balance / LAMPORTS_PER_SOL, "SOL");
}

async function sendSol(sol: number, address: PublicKey){
    var keyPair = loadKeyPairFromFile();
    var instruction = SystemProgram.transfer({
        fromPubkey: keyPair.publicKey,
        toPubkey : address,
        lamports: sol * LAMPORTS_PER_SOL
    });

    var transaction = new Transaction().add(instruction);
    var transactionSignature = await sendAndConfirmTransaction(connection, transaction, [keyPair]);


    console.log("Transaction Signature:", transactionSignature);

}
async function getAccount(address: PublicKey){
    var keyPair = loadKeyPairFromFile();
    var account = await connection.getAccountInfo(address);
    console.log("Account:", account);
}

program
    .command("CreateWallet")
    .description("Create a new wallet")
    .action(() => {
        createKeyPair();
    }
)

program
    .command("Airdrop <amountInSol>")
    .description("Airdrop SOL to the wallet")
    .action(async (amountInSol: number) => {
        await airdropSol();
        console.log(`Airdropped ${amountInSol} SOL to the wallet.`); 
    }
)

program
    .command("Balance")
    .description("Get the balance of the wallet")
    .action(async () => {
        await balance();
        console.log("Balance retrieved successfully.");
    }
)

program
    .command("SendSol <amountInSol> <address>")
    .description("Send SOL to another address")
    .action(async (amountInSol: number, address: string) => {
        var keyPair = loadKeyPairFromFile();
        var recipientAddress = new PublicKey(address);
        await sendSol(amountInSol, recipientAddress);
    }
)

program
    .command("GetAccount <address>")
    .description("Get account information")
    .action(async (address: string) => {
        var recipientAddress = new PublicKey(address);
        await getAccount(recipientAddress);
    }
)

program.parse(process.argv);