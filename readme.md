# 🔐 Bholuma CLI Wallet for Solana

A beginner-friendly, easy-to-use command-line tool to interact with the **Solana blockchain**. This CLI wallet allows you to create a wallet, check your balance, airdrop test SOL, send SOL, and fetch account info — all from your terminal!

---

## 🌐 What is Web3?

Web3 refers to the **decentralized internet** powered by blockchains. Unlike traditional systems where data is controlled by companies, Web3 allows **users to own their data** and interact with smart contracts in a **trustless** and **secure** way.

---

## 💰 What is a Web3 Wallet?

A Web3 wallet is like a **digital bank account** that stores your **cryptocurrency**, allows you to **sign transactions**, and interact with decentralized apps (**dApps**).

In Solana's case, this wallet contains:

* A **public key** (like your account number)
* A **private/secret key** (like your password — never share this!)

---

## ⚙️ Features

* ✅ Create a new Solana wallet
* 😰 Request an airdrop of test SOL tokens (on **devnet**)
* 💸 Send SOL to other wallets
* 💰 Check your wallet balance
* 🔍 Inspect account information

---

## 📦 Prerequisites

* Node.js installed (v18+ recommended)
* Basic command-line knowledge

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/yourusername/solana-wallet-cli.git
cd solana-wallet-cli
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the CLI

```bash
node wallet-cli.ts <command>
```

> You can rename it to `wallet` and use `npm link` to run it globally.

---

## 📘 Usage Guide

> All transactions happen on **Solana Devnet** (a public testing environment).

### 🔐 Create a Wallet

```bash
node wallet-cli.ts CreateWallet
```

* Generates a new keypair
* Saves the **secret key** locally in `keypair.json`
* DO NOT share this file!

---

### 😰 Airdrop SOL

```bash
node wallet-cli.ts Airdrop 5
```

* Requests 5 test SOL tokens to your wallet from the Solana Devnet faucet.
* Useful for testing without spending real money.

---

### 💰 Check Balance

```bash
node wallet-cli.ts Balance
```

* Displays current SOL balance of your wallet.

---

### 💸 Send SOL

```bash
node wallet-cli.ts SendSol 1 <recipient_address>
```

* Sends 1 SOL from your wallet to the given address.
* The recipient must be a valid Solana public key.

---

### 🔍 Get Account Info

```bash
node wallet-cli.ts GetAccount <address>
```

* Prints account details like ownership, lamports, and data buffer.

---

## 🧠 Behind the Scenes (Technical Summary)

* **Keypair Generation**: Using `Keypair.generate()` to create a wallet.
* **Persistent Storage**: Saving your secret key to a file for reuse.
* **Connection**: Communicating with Solana Devnet using `@solana/web3.js`.
* **Airdrop**: Gets testnet SOL via `connection.requestAirdrop()`.
* **Transfer**: Uses `SystemProgram.transfer()` wrapped in a `Transaction`.
* **Balance Check**: Fetches with `connection.getBalance()`.
* **Account Info**: Uses `connection.getAccountInfo()` to fetch account state.

---

## 🛘 Security Note

* This wallet stores your **private key in plain text** (`keypair.json`). NEVER use this for real/mainnet funds!
* This is a learning tool and should be used **only on devnet**.

---

## 🙌 Contributing

Want to improve the CLI or add new features? PRs are welcome! Here are some ideas:

* Encrypt the secret key
* Add support for multiple accounts
* Build a web UI for this CLI

---

## 📚 Resources

* [Solana Docs](https://docs.solana.com/)
* [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/)
* [Solana Faucet (Devnet)](https://solfaucet.com/)
* [Awesome Solana](https://github.com/ajamaica/awesome-solana)

---

## 📜 License

MIT — free to use, modify, and share.
