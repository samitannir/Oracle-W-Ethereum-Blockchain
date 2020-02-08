pragma solidity ^0.5.8;

contract stockOracle {
    struct stock {
        uint price;
        uint volume;
    }
    mapping (bytes4=> stock) public stockQuote;
    address public oracleOwner;
    constructor() public {
        oracleOwner = msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == oracleOwner,"only Owner");
        _;
    }
    function setStock(bytes4 symbol,uint price,uint volume) public onlyOwner{
        stock memory quote = stock(price,volume);
        stockQuote[symbol] = quote;
    }
    function getStockPrice(bytes4 symbol) public view returns(uint){
        return stockQuote[symbol].price;
    }
    function getStockVolume(bytes4 symbol) public view returns(uint){
        return stockQuote[symbol].volume;
    }
}

