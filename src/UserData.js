  
import Cookies from 'js-cookie';
  import { useState } from "react";
     const GetInvestmentAccounts = async () => {
 const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState([]);
  const [savings, setSavings] = useState([]);
  const [userId, setUserId] = useState([Cookies.get('UserId')])
 

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

    export {GetInvestmentAccounts}

