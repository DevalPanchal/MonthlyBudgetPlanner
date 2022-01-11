import React, { useEffect, useState } from 'react';
import { List } from './List';
import { Statistics } from './Statistics';

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { print } from '../utility/print';

export default function MainPage() {
     // user input state
     const [inputBudget, setInputBudget] = useState("");
     const [inputExpense, setInputExpense] = useState("");

     // user statistics
     const [expenseType, setExpenseType] = useState("");
     const [expenseAmount, setExpenseAmount] = useState(0);

     const [budgetType, setBudgetType] = useState("");
     const [budget, setBudget] = useState(0);

     // inputs array
     const [inputs, setInputs] = useState([]);
     const [budgets, setBudgets] = useState([]);

     // chart data structures
     const [chartLabels, setChartLabels] = useState([]);
     const [chartDataset, setChartDataset] = useState([]);

     const data = {
          labels: chartLabels.map((item) => item.type),
          datasets: [
               {
                    label: '# of Votes',
                    data: chartDataset.map((item) => item.amount),
                    backgroundColor: [
                         'rgba(255, 99, 132, 0.5)',
                         'rgba(54, 162, 235, 0.5)',
                         'rgba(255, 206, 86, 0.5)',
                         'rgba(75, 192, 192, 0.5)',
                         'rgba(153, 102, 255, 0.5)',
                         'rgba(255, 159, 64, 0.5)',
                         'rgba(255, 219, 64, 0.5)',
                         'rgba(50, 159, 64, 0.5)',
                         'rgba(70, 159, 64, 0.5)',
                    ],
                    borderColor: [
                         'black',
                    ],
                    borderWidth: 1,
               },
          ],
     };

     const handleSave = (e) => {
          e.preventDefault();
          localStorage.setItem("budgets", JSON.stringify(budgets));
          localStorage.setItem("inputs", JSON.stringify(inputs));
          localStorage.setItem("budget", budget);
          localStorage.setItem("expenseAmount", JSON.stringify(expenseAmount));
          localStorage.setItem("chartLabels", JSON.stringify(chartLabels));
          localStorage.setItem("chartDataset", JSON.stringify(chartDataset));
     }

     const handleExpenseSubmit = (e) => {
          e.preventDefault();
          if ((inputExpense.length && expenseType.length) > 0) {
               let newObj = { id: inputs.length, type: expenseType, amount: inputExpense };
               setInputs([...inputs, newObj]);
               setExpenseType("");
               setInputExpense("");
               setExpenseAmount(parseInt(inputExpense) + expenseAmount);
               setChartLabels([...chartLabels, newObj]);
               setChartDataset([...chartDataset, newObj]);
          } else {
               console.error("Need an Input");
          }
     }

     const handleBudgetSubmit = (e) => {
          e.preventDefault();
          if ((inputBudget.length && budgetType.length) > 0) {
               let newObj = { id: budgets.length, type: budgetType, amount: inputBudget };
               setBudgets([...budgets, newObj]);
               setBudgetType("");
               setInputBudget("");
               setBudget(parseInt(inputBudget) + budget);
               setChartLabels([...chartLabels, newObj]);
               setChartDataset([...chartDataset, newObj]);
          } else {
               console.error("Need an Input")
          }
     }

     const removeItem = (item) => {
          setInputs(inputs.filter(element => element.id !== item.id));
          setExpenseAmount(expenseAmount - parseInt(item.amount));
          setChartLabels(chartLabels.filter(element => element.id !== item.id));
          setChartDataset(chartDataset.filter(element => element.id !== item.id));
     }

     const removeBudget = (item) => {
          setBudgets(budgets.filter(element => element.id !== item.id));
          setBudget(budget - parseInt(item.amount));
          setChartLabels(chartLabels.filter(element => element.id !== item.id));
          setChartDataset(chartDataset.filter(element => element.id !== item.id));
     }

     useEffect(() => {
          if (localStorage.budget) print(budget);
          if (localStorage.budgets) print(JSON.parse(localStorage.budgets));
          if (localStorage.inputs) print(JSON.parse(localStorage.inputs));
          if (localStorage.expenseAmount) print(localStorage.expenseAmount);
          if (localStorage.chartDataset) print(JSON.parse(localStorage.chartDataset));
          if (localStorage.chartLabels) print(JSON.parse(localStorage.chartLabels));
     }, []);

     return ( 
          <div className="main-container">
               <div className="left-pane-container">
                    <div className="current-statistics">
                         <h2 className="title">Current Statistics</h2>
                         <div className={chartLabels.length > 0 ? "plot-container" : ""}>
                              <Doughnut data={data} />
                         </div>
                    </div>
               </div>
               <div className="right-pane-container">
                    <div className="title-container">
                         <h1 className="title">My Monthly Budget Planner</h1>
                         <button className="save-btn" onClick={ handleSave }>Save</button>
                    </div>
                    <div className="statistics-container">
                         <Statistics title={"Budget"} amount={ budget } />
                         <Statistics title={"Remaining"} amount={ budget - expenseAmount } />
                         <Statistics title={"Spent"} amount={ expenseAmount } />
                    </div>

                    <form className="form-container" onSubmit={ handleBudgetSubmit }>
                         <label>Budget</label>
                         <br />
                         <div className="input-container">
                              <input className="input-bar" type="text" value={ budgetType } onChange={(e) => setBudgetType(e.target.value)} autoFocus placeholder="Enter Budget" />
                              <input className="input-bar" type="number" value={ inputBudget } onChange={(e) => setInputBudget(e.target.value)} placeholder="$" />
                              <input className="submit-btn" type="Submit" />
                         </div>
                    </form>
                    <List inputsList={ budgets } removeTodo={ removeBudget } />
                    <form className="form-container" onSubmit={ handleExpenseSubmit }>
                         <label>Expenses</label>
                         <br />
                         <div className="input-container">
                              <input className="input-bar" type="text" value={ expenseType } onChange={(e) => setExpenseType(e.target.value) } placeholder="Enter an Expense..." />    
                              <input className="input-bar" type="number" value={ inputExpense } onChange={(e) => setInputExpense(e.target.value) } placeholder="$" />                
                              <input className="submit-btn" type="Submit" />
                         </div>
                    </form>
                    <List inputsList={ inputs } removeTodo={ removeItem } />
               </div>
          </div>
     );
}