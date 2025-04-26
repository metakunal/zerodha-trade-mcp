import { KiteConnect } from "kiteconnect";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY||'';

const kc = new KiteConnect({ api_key: apiKey });

export async function placeOrder(tradingsymbol:string,quantity:number,type:"BUY"|"SELL") {
  try {
    kc.setAccessToken(process.env.ACCESS_TOKEN||'');
    const profile = await kc.placeOrder("regular",{
        exchange:"NSE",
        tradingsymbol:"HDFCBANK",
        transaction_type:"BUY",
        quantity:1,
        product:"CNC",
        order_type:"MARKET"
    });
    console.log("Profile:", profile);
  } catch (err) {
    console.error(err);
  }
}
