// HomePage.js
import React from "react";
import TopBar from "./TopBar";
import { Link} from 'react-router-dom'
import graphImage from "../pictures/vecteezy_green-dollars-and-a-stack-of-gold-coins-a-bag-of-money-in_23743918.png"
import pieChartImage from "../pictures/2011745.png"

export default function HomePage() {
    return (
        <div>
            <TopBar />
            <div  className="bg-yellow-300  flex flex-row p-48 justify-normal align-middle">
                <div className= "flex flex-col gap-3">     
                   <h1 className="font-mono text-4xl">Be able to view your finances at one place </h1>

               <Link className="p-14 m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200" to="/signup"> Sign up </Link>
</div>


                     <img  className="w-1/2" src={graphImage} alt="Description of the image" />

             

            </div>
            <div className="bg-slate-100  h-1/2 flex flex-row  justify-normal align-middle gap-10">
             
             
                     <img  className="w-1/2 " src={pieChartImage} alt="Description of the image" />
                <h1 className="my-auto font-mono  text-4xl"> easily rebalance your portfolio</h1>



            </div>
         
        </div>    
    );
}
