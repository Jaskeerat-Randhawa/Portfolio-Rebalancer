import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import SavingGoals from "./SavingGoals";

import Cookies from 'js-cookie';
export default function SideBar() {


 const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState([]);
  const [savings, setSavings] = useState([]);
  const [userId, setUserId] = useState([Cookies.get('UserId')])
 


  const [Accounts, setAccounts] = useState([]);


  useEffect(() => {
   
    const getInvestmentAccountsNames = async () => {
      try {
        const response = await fetch(`http://localhost:8080/investments/${userId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);

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


    getInvestmentAccountsNames();
  },[])




return (
  <div>
    <div className="bg-green-2 border-r-4 fixed border-beige h-full p-4 mr-7">
      {investments && investments.length > 0 ? (
        investments.map((accounts)=>(
          <div key={accounts.AccountID}>
            <button className="m-4 border rounded-md text-white font-bold p-4 font-poppins   p-2 bg-"><h1>{accounts.Name}</h1></button>
          </div>
        )) ):(
        <h1>acount not found</h1>
      )}

    </div>

  </div>
);
}
