import React from "react";
import { getStockPrice } from "../Components/StockData";

const GetAccountHoldings = async (CustomerID, AccountId) => {
  try {

    let accountValue = 0 ;
    const response = await fetch(`http://localhost:8080/investments/holdings/${AccountId}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();

    for (let i = 0; i <  data[0].holdings.length; i++) {
      const stockPriceResponse = await fetch(`http://localhost:8080/stock/simple/${data[0].holdings[i].ticker}`);
      if (!stockPriceResponse.ok) {
        throw new Error(`Network error: ${stockPriceResponse.statusText}`);
      }
      const stockPriceData = await stockPriceResponse.json();

      data[0].holdings[i].stockPrice = stockPriceData[0].price
      data[0].holdings[i].totalValue = stockPriceData[0].price * data[0].holdings[i].shares


    accountValue = accountValue + data[0].holdings[i].totalValue


   
      
    }
    for ( let w = 0; w < data[0].holdings.length; w++){
      data[0].holdings[w].Allocation = Math.round(data[0].holdings[w].totalValue / accountValue *100)/ 100
  
      }
  

    data[0].accountValue = accountValue

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
};

const GetCustomerHoldings = async (CustomerID) => {
  try {
    const response = await fetch(`http://localhost:8080/investments/${CustomerID}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();

    for (let i = 0; i < data[0].holdings.length; i++) {
      const stockPriceResponse = await fetch(`http://localhost:8080/stock/simple/${data[0].holdings[i].ticker}`);
      if (!stockPriceResponse.ok) {
        throw new Error(`Network error: ${stockPriceResponse.statusText}`);
      }
      const stockPriceData = await stockPriceResponse.json();

      data[0].holdings[i].stockPrice = stockPriceData[0].price
      data[0].holdings[i].totalValue = stockPriceData[0].price * data[0].holdings[i].shares

      
    }

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    throw err;
  }
};


const GetCustomerGoalHoaldings = async (AccountID) =>{

  try {
    const response = await fetch(`http://localhost:8080/goal/${AccountID}`);
    if (!response.ok){
      throw new Error(`Network arro: ${response.statusText}`)

    }
    const goalHoldings = await response.json();
    return goalHoldings
  }catch(err){
      console.log(`error geting the useres goalholdings ${err}`)
  }
}


const GetHoldingHistoricData = async (Holdings) =>{


  try{

  }catch
  {

  }
}
export { GetAccountHoldings, GetCustomerHoldings, GetCustomerGoalHoaldings };
