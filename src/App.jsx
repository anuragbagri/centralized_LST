import MintTokens from "./MintTokens"
import Address from "./Address"
import dotenv from "dotenv"
dotenv.config();
import express from "express"

const app = express();

// assume this is the response we get from helius
const helius_response = {
  "nativeTransfers": [ {
     "amount": 3000000000, 
     "fromUserAccount": "3EPRdypzxrrnCaASfA7gtqxNPTnfdEcxAdjKoKdKQ6cC",
     "toUserAccount": "7HnV9mDCfnPR44ggSTqGz2VVxPLNw8woAJ5TfN4sE1d9" } ]
}

const VAULT ="7HnV9mDCfnPR44ggSTqGz2VVxPLNw8woAJ5TfN4sE1d9";

function App() {
 app.post('/helius',async(req,res)=> {
  const incomingTx= helius_response.nativeTransfers.find(x => x.toUserAccount === VAULT)   // if the transaction is coming to my account ,then only proceed
  if(!incomingTx){
    res.json({message:"processed"})
    return 
  }
  const fromAddress = incomingTx.fromUserAccount;
  const toAddress = incomingTx.toUserAccount;
  const amount =incomingTx.amount;
  const type ="received_native_sol";
  await MintTokens(fromAddress,amount);   //mint this much amount to this address. 

 })
 
}

export default App
