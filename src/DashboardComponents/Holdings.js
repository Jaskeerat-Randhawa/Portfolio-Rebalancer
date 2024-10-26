import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import { PieChartByInvestmentAccount } from '../Components/DashboardGraphs';
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";
import { updateGoalHoldings } from "./AddHolding";
import { GetAccountHoldings, GetCustomerGoalHoaldings } from './GetHolding'; // Ensure this function correctly fetches data
export default function Holding() {
  const [holdings, setHoldings] = useState([]);
  const [editMode, setEditMode] = useState(false);
  // const [goalHoldings, setGoalHoldings] = useState([]) for later
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const [tickerSearch, setTickerSearch] = useState([]);
  const [cashHolding, setCashHolding] = useState(null)
  const [numOfGoalHoldings, setNumOfGoalHoldings] = useState(1)
  const [goalHoldings, setGoalHoldings] = useState([]);
  const [accountValue, setAccountValue] = useState(null)
  let { CustomerID, AccountID } = useParams();




  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAccountHoldings(CustomerID, AccountID);
        setHoldings(data[0].holdings);


        setAccountValue(data[0].accountValue)

        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchGoalHoalings = async () => {
      const goalHoldings = await GetCustomerGoalHoaldings(AccountID)

      setGoalHoldings(goalHoldings[0].holdings)


    }
    fetchGoalHoalings()

    fetchData();

  }, [CustomerID, AccountID]);

  /*
  useEffect(()=>{
  
    console.log(query)
    const serachTicker = async () =>{
      try 
      {
      const data = await fetch(`http://localhost:8080/stock/search/${query}`);
  console.log(data)
  setTickerSearch(data)
      }
      catch{
  
      }
    }
  serachTicker()
  },[query])
  
  */
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const ChangeGoalHoldingAllocation = (event) => {



    goalHoldings.map((goalHolding) => {
      if (goalHolding.ticker + "al" === event.target.id) {

        console.log("works")
        goalHolding.Allocation = event.target.value
      }

    })

  }
  const ChangeGoalHoldingTicker = (event) => {

    goalHoldings.map((goalHoldings) => {

      if (goalHoldings.ticker === event.target.id) {
        goalHoldings.ticker = event.target.value
      }
    })


  }


  const  deleteHolding = (ticker) =>{
    console.log(ticker)
    console.log(goalHoldings)

    console.log("delete")
  }

  const GoalHoaldings = (goalHoldings) => {




    function allowEdit() {
      setEditMode(true)
    }

    function saveGoalHoldings(goalHoldings) {

      updateGoalHoldings(goalHoldings)
      
    }


    const deleteGoal = deleteHolding => {



      setGoalHoldings(current =>
        current.filter(goalHoldings => {
          return goalHoldings.ticker !== deleteHolding;

        })
      )


    }
    const addNewGoal = newHolding => {

      setGoalHoldings(goalHoldings => [
        ...goalHoldings,
        newHolding
      ]);
    };

    if (editMode == false) {


      let decunstructGoalHoldings = goalHoldings.data
      return (
        <div>
          <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Asset Class</span>
</label>
          <div className='m-20 w-1/2 mt-32'>
            {decunstructGoalHoldings && decunstructGoalHoldings.length > 0 ? (
              <ul>
                {decunstructGoalHoldings.map((decunstructGoalHoldings, index) => (
                  <div className="" key={index}>
                    <div className="">
                  <h1 className= "text-white bg-red-500 border rounded-md w-1/2" onClick={() => deleteHolding(decunstructGoalHoldings.ticker) }>delete </h1>
                      <div
                        className="text-3xl font-bold border border-green p-1 focus:outline-none focus:border-blue-500"
                        role="heading"
                        aria-level="1">
                        Ticker:
                        <input defaultValue={decunstructGoalHoldings.ticker} id={decunstructGoalHoldings.ticker} onChange={(e) => {
                          decunstructGoalHoldings.ticker = e.target.value
                        }}>
                        </input>
                      </div>
                      <div
                        className="text-2xl font-bold border border-green p-1 focus:outline-none focus:border-blue-500"
                        role="heading"
                        aria-level="1">
                        Allocation
                        <input id={decunstructGoalHoldings.ticker + "al"} defaultValue={decunstructGoalHoldings.Allocation} onChange={(e) => {
                          decunstructGoalHoldings.Allocation = e.target.value
                        }}  >
                        </input>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <div>No investments data</div>
            )}
            <button onClick={() => saveGoalHoldings(goalHoldings)} className="border border-green-700 bg-yellow p-4">
              Save
            </button>
            <button onClick={() => addNewGoal({ ticker: "New Holding", Allocation: "00.00" })}> Add stock </button>
          </div>
        </div>
      )
    };
  }
  return (
    <div className="bg-green-2 min-h-full">
      <TopBar />
      <SideBar />
      <div className="ml-36 m-5 flex flex-row">
        <div>
          <div className="border m-5 border-beige rounded border-4">
            <div className='m-20   mt-32'>
              {holdings && holdings.length > 0 ? (
                <ul>
                  {holdings.map((holding, index) => (
                    <li className="text-grey border border-2 rounded-s-sm font-bold" key={index}>
                      <p className="m-2">Ticker: {holding.ticker}</p>
                      <p className="m-2">totalValue: ${holding.totalValue}</p>
                      <p className="m-2">Allocation: {holding.Allocation * 100}%</p>
                      <p className="m-2"></p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No investments data</div>
              )}
            </div>
          </div>
          <div></div>
          <PieChartByInvestmentAccount data={holdings} />
        </div>
        <div className="border border-green-500  rounded w-1/2">
          <h1> Goal Holding for Account </h1>
          <GoalHoaldings data={goalHoldings} />
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}
