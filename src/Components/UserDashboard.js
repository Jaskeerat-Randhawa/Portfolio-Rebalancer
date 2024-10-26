import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import TopBar from './TopBar';
import Sidebar from './SideBar';
import { TotalPieChart, TotalSavingPieChart, TotalInvestedLineGraph } from './DashboardGraphs'; // Import named exports
import { GetAccountHoldings } from '../DashboardComponents/GetHolding';
import Cookies from 'js-cookie';
export default function UserDashboard() {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState([]);
  const [savings, setSavings] = useState([]);
  const [userId, setUserId] = useState([Cookies.get('UserId')])
  
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/${userId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        ;
        setUserData(data);
        setError(null);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setUserData([]);
      } finally {
        setLoading(false);
      }
    };

    const getInvestmentAccounts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/investments/${userId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        setInvestments(data);
        setError(null);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setInvestments([]);
      } finally {
        setLoading(false);
      }
    };

    const getSavingAccounts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/savings/${userId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setSavings(data);
        setError(null);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setSavings([]);
      } finally {
        setLoading(false); 
      }
    };

    getSavingAccounts();
    getInvestmentAccounts();
    fetchUserData();
  }, []);

  useEffect(() => {

    const getInvestmentAccountValue = async (investments) => {
      let AccountValue = 0
      try {
        for (let i = 0; i < investments.length; i++) {
          try {
            const response = await fetch(GetAccountHoldings(investments[i].UserID, investments[i].AccountID))
            if (!response.ok) {
              throw new error("eror occured gettign account value ")
            }

            const data = await response.json()
            console.log(data)
            //
            ////             for (let w = 0; w < response[0].holdings.length; w++){
            ////               AccountValue =+  response[0].holdings[w].totalValue 
            //           }
          }
          catch { }
        }
      }
      catch {

      }
    }
    getInvestmentAccountValue(investments);

  }, [investments])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-200">
      <TopBar />
    <div className= "flex">
    <aside className= "sidebar">
      <Sidebar />
    </aside>

    </div>
<div className=""> 
      <div className=' ml-10 p-12 w-1/2 fit-content'>
      {userData.length > 0 ? (
        <div>Welcome {userData[0].Name}</div>
      ) : (
        <div>No user data</div>
      )}

      <div className='ml-20  bg-gray-300 rounded-sm p-12 w-3/4 border  shadow-lg mt-32 '>
    <h1 className ="font-poppins font-bold text-2xl"> Investing Accounts</h1>
        {investments && investments.length > 0 ? (
          investments.map((investment) => (

            <Link
              key={investment.AccountID}

              to={{
                pathname: `/holdings/${investment.UserID}/${investment.AccountID}/`,
                state: {
                  from: {
                    AccountID: investment.AccountID,
                    CustomerID: investment.CustomerID,
                  },
                },
              }}
            >
              <div className=" bg-gray-500 shadow-lg m-4 border-green-500   rounded hover:bg-sky-700 cursor-pointer">
                <h2 className="text-white">{investment.Name}</h2>
                <p className="text-white font ">${investment.Balance}</p>
              </div>
            </Link>
          ))
        ) : (
          <div>No investments data</div>
        )}


      </div>
      <div className='ml-20  bg-gray-300 rounded-sm p-12 w-3/4 border  shadow-lg mt-4 '>
    <h1 className="font-poppins font-bold text-2xl"> Saving Accounts</h1>
        {savings && savings.length > 0 ? (
          savings.map((saving) => (
            <div key={saving.AccountID} className=' bg-gray-500 shadow-lg m-4 border-green-500   rounded hover:bg-sky-700 cursor-pointer'>
              <h1 className ="text-white">{saving.AccountID}</h1>
              <h1 className= 'text-white text-xl '>${saving.Balance}</h1>
            </div>
          ))
        ) : (
          <div>No investments data</div>
        )}
      </div>

      <div className='w-full'>
        <h1 className='mx-auto w-1/2'> total Account values </h1>
        <TotalPieChart  className='w-full'data={investments} />
        <TotalSavingPieChart data={savings} />

      </div>
    </div>
    </div>
    </div>
  );



};

