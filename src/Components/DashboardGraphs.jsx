import React from 'react';
import {getStockData } from './StockData';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const TotalPieChart = ({ data }) => {
    const pieChartData = {
        labels:
      data.map(item => `${item.Name.toString()}`)         ,
            datasets: [{
            data: data.map(item => item.Balance),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                // Add more colors as needed
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                // Add more colors as needed
            ]
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            },
           
        },
        layout:{
          padding:10 
        }
    };

    return (
        <div>
            <Pie data={pieChartData} options={options} />
        </div>
    );
};

const TotalSavingPieChart = ({ data }) => {
    const pieChartData = {
        labels:  data.map(item => item.AccountID.toString()),
        datasets: [{
            data: data.map(item => item.Balance) ,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                // Add more colors as needed
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                // Add more colors as needed
            ]
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title'
            }
        }
    };

    return (
        <div>
            <Pie data={pieChartData} options={options} />
        </div>
    );
};
const TotalInvestedLineGraph = ({ data }) => {
   
    const lineChart = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  
    // Define your chart options
    const options = {
      type: 'line',
      scales: {
        x: {
          type: 'category',
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          type: 'linear',
          beginAtZero: true,
        },
      },
    };
    return(
        <div>
            <Line data = {lineChart} options={options} />
        </div>
    )




}

const PieChartByInvestmentAccount = ({ data }) => {
    const pieChartData = {
        labels:  data.map(item => item.ticker),
        datasets: [{
            data: data.map(item => item.totalValue) ,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ]
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Holdings'
            }
        }
    };

    return (
        <div>
            <Pie data={pieChartData} options={options} />
        </div>
    );
};


const SavingGoalsChart = ({data}) => {


    const Goal = data.GoalAmount;
    const CurrentAmount = data.CurrentAmount
    const Remaining= Goal-CurrentAmount;
    const pieChartData = {
        labels: ["CurrentAmount", "Remaining"],
        datasets: [{
            data: [CurrentAmount, Remaining ],
            backgroundColor:[
                'Green',
                'Yellow'

            ]
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: data.GoalName
            }
        }
    };

    return(
        <div>
            <Pie data = {pieChartData} options={options} />
        </div>
    )
}

export { TotalPieChart, TotalSavingPieChart, TotalInvestedLineGraph, PieChartByInvestmentAccount, SavingGoalsChart };

