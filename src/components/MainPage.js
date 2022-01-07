import React, { useState } from 'react';
import { List } from './List';
import { Statistics } from './Statistics';

// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

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
          labels: chartLabels,
          datasets: [
               {
                    label: '# of Votes',
                    data: chartDataset,
                    backgroundColor: [
                         'rgba(255, 99, 132, 0.5)',
                         'rgba(54, 162, 235, 0.5)',
                         'rgba(255, 206, 86, 0.5)',
                         'rgba(75, 192, 192, 0.5)',
                         'rgba(153, 102, 255, 0.5)',
                         'rgba(255, 159, 64, 0.5)',
                    ],
                    borderColor: [
                         'black',
                    ],
                    borderWidth: 1,
               },
          ],
     };

     const handleExpenseSubmit = (e) => {
          e.preventDefault();
          let newObj = { id: inputs.length, type: expenseType, amount: inputExpense };
          setInputs([...inputs, newObj]);
          setExpenseType("");
          setInputExpense("");
          setExpenseAmount(parseInt(inputExpense) + expenseAmount);
          setChartLabels([...chartLabels, expenseType]);
          setChartDataset([...chartDataset, inputExpense]);
     }

     const handleBudgetSubmit = (e) => {
          e.preventDefault();
          let newObj = { id: budgets.length, type: budgetType, amount: inputBudget };
          setBudgets([...budgets, newObj]);
          setBudgetType("");
          setInputBudget("");
          setBudget(parseInt(inputBudget) + budget);
          setChartLabels([...chartLabels, budgetType]);
          setChartDataset([...chartDataset, inputBudget]);
     }

     const removeItem = (item) => {
          setInputs(inputs.filter(element => element.id !== item.id));
     }

     const removeBudget = (item) => {
          setBudgets(budgets.filter(element => element.id !== item.id));
          setBudget(budget - parseInt(item.amount));
     }

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
                    <h1 className="title">My Monthly Budget Planner</h1>
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