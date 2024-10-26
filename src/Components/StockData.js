



const getStockPrice  = async ({ticker})=>{

try{
    const response = await fetch(`stock/simple/${ticker}}`)

    if (!response.ok){
        console.log("error getting stockData")
    }
    return(response.json())
}
catch (error){
console.error("Error geting stock data" , error)

}

}





export { getStockPrice }

