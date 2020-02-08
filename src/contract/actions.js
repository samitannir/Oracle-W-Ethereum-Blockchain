import Web3 from 'web3';

import {STOCK_ORACLE_ABI,STOCK_ORACLE_ADDRESS} from "./contractInfo"
const web3 = new Web3("http://localhost:8545");
const stockQuote = new web3.eth.Contract(STOCK_ORACLE_ABI,STOCK_ORACLE_ADDRESS);
export const addStock = async (symbol,price,volume)=> {

    const accounts = await web3.eth.getAccounts();

    const bytes4Symbol = web3.utils.fromAscii(symbol);
    const tx= await stockQuote.methods.setStock(bytes4Symbol,price,volume).send({from: accounts[0]});
    console.log(tx)
}

export const getPriceStock = async (symbol)=> {
    const accounts = await web3.eth.getAccounts();
    const bytes4Symbol = web3.utils.fromAscii(symbol);
    const tx= await stockQuote.methods.getStockPrice(bytes4Symbol).call({from: accounts[0]});
    console.log(tx);
    return tx;
}

export const getVolumeStock = async (symbol)=> {
    const accounts = await web3.eth.getAccounts();
    const bytes4Symbol = web3.utils.fromAscii(symbol);
    const tx= await stockQuote.methods.getStockVolume(bytes4Symbol).call({from: accounts[0]});
    return tx;
}
