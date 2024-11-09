import { createAssociatedTokenAccount, getAssociatedTokenAddress, mintTo } from "@solana/spl-token";
import {Connection, Keypair, PublicKey, sendAndConfirmRawTransaction, Transaction} from "@solana/web3.js"
import { PRIVATE_KEY, TOKEN_MINT_ADDRESS } from "./Address";
import bs58 from "bs58";
 


const connection = new Connection("https://api.devnet.solana.com");

function base58TOkeyPair(base58Privatekey){
  try {
    const privateKey = bs58.decode(base58Privatekey);
    return Keypair.fromSecretKey(privateKey);
  }
  catch {
    throw new Error("invalid base58 private key");
  }
}
const keypair = base58Privatekey(PRIVATE_KEY)


// minting customs tokens using the solana cli and creating the assocaited token(TOKEN_MINT_ADDRESS account using the solana cli 
export const MintTokens = async(fromAddress,amount)=> {
 const recepientPublicKey =new PublicKey(fromAddress)
 const mintPublicKey = new PublicKey(TOKEN_MINT_ADDRESS);

 // get the recipent ata for the token 
 const ata = await getAssociatedTokenAddress(
  mintPublicKey,
  recepientPublicKey,
  false,
 )

 // check if the account exist 
 const getataInfo = await connection.getAccountInfo(ata);

 if(!getataInfo){ // create a ata
   console.log("creating a ATA for receipent address")
   const createAtaAccount = new Transaction().add(
    createAssociatedTokenAccount(
      connection,
      keypair.PublicKey,
      ata,
      recepientPublicKey,
      mintPublicKey
    )
   );
   await sendAndConfirmRawTransaction(connection,createAtaAccount,[keypair]);
   console.log("associated token account has been created");
 }

 // mintitng tokens to the recepients ata
 const tx = mintTo(
  connection,
  keypair,
  mintPublicKey,
  ata,
  keypair,
  amount
 );

 console.log("amount has been send to recepient ata ")
}