import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import { SavingGoalsChart } from "./DashboardGraphs";

import Cookies from 'js-cookie';
export default function SavingGoals(){


  
    const [goals, setGoals] = useState([])

    const [userId, setUserId] = useState([Cookies.get('UserId')])
    const [editMode, setEditMode] = useState(false);
    


    useEffect(()=>{
      function getUserID(){
        setUserId(Cookies.get('UserId'))

      }

      getUserID()
    })


function edit(data){
  console.log(data)
} 


    useEffect(()=>{
      const getSavingGoals = async ()=>{
        const response = await fetch(`http://localhost:8080/Saving/All/${userId}`)
        const data =   await response.json()
        setGoals(data)

      }
      
      getSavingGoals();
    },[userId])

    useEffect(()=>{
if (goals.length > 1){
  return <p>Looks like you have no savings add one by clicking here </p>
}
    },[goals])


    return(
        <div>
        <TopBar/>
        <SideBar/>
        <h1> hello</h1>
        <button type="button" className="mx-44"> Add Goal </button>
{goals.map((goal, index) => (
  <div className="p-3 mx-auto bg-gray-100  border w-1/2 rounded-lg shadow-md" key={goal.GoalID}>
    <h1>Goal Amount </h1>
   <p>${goal.GoalAmount}</p> 
    <h1>Current </h1>
    <p>${goal.CurrentAmount}</p>
    <button onClick={edit(goal)}
    className="bg-yellow-400 px-4 border border-dotted rounded-lg border-green-500"
    >Edit</button>
    
    <SavingGoalsChart data={goal} index={index} />
    

     


  </div>
))}


        
</div>
    )
    
}

