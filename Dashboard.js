import {
    saveExpense,
    loadExpenses,
    removeExpense,
    getProfileImage
} from "./database.js";
const userName =
localStorage.getItem("userName");

document.getElementById("user").innerText =
"Hello 👋 " + userName;

if(!userName){
    window.location.href = "Login.html";
} 
const greetingEl = document.getElementById("greeting");
const welcomeEl = document.getElementById("welcomeText");

if(greetingEl){
    const hour = new Date().getHours();

    let greeting = "";

    if(hour < 12){
        greeting = "Good Morning ☀️";
    }else if(hour < 17){
        greeting = "Good Afternoon 🌤️";
    }else{
        greeting = "Good Evening 🌙";
    }

    greetingEl.innerText = greeting;
}

if(welcomeEl){
    welcomeEl.innerText = "Welcome Back";
}

let expenses = [];

async function initExpenses(){

    expenses = await loadExpenses();

    showExpense();
    updateDashboard();
    updateChart();
    updateGoal();
    updateStats();
}

initExpenses();

}
async function addExpense() {

    let title = document.getElementById("title").value;
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;

    if(title.trim()===""){
        alert("Enter a title");
        return;
    }

    if(amount<=0){
        alert("Enter a valid amount");
        return;
    }

    const expense = {
        title,
        amount,
        category,
        date:new Date().toISOString(),
        month:new Date().getMonth(),
        year:new Date().getFullYear()
    };

    await saveExpense(expense);

    expenses.push(expense);

    showExpense();
    updateDashboard();
    updateChart();
    updateGoal();
    updateStats();

    document.getElementById("title").value="";
    document.getElementById("amount").value="";

    closePopup();
}
({
        title:title,
        amount:amount,
        category:category,
        date: new Date().toISOString(),
month: new Date().getMonth(),
year: new Date().getFullYear()
    });

  

    showExpense();
    updateDashboard();
    updateChart();
    updateStats();

}

async function deleteExpense(index){

    if(expenses[index].id){
        await removeExpense(expenses[index].id);
    }

    expenses.splice(index,1);
    updateGoal();
    updateStats();
    showExpense();
    updateDashboard();
    updateChart();
    updateGoal();
    updateStats();
}

function showExpense(){

let list=document.getElementById("list");

list.innerHTML="";
let search =
document.getElementById("search").value.toLowerCase();

let filter =
document.getElementById("filterCategory").value;
let total=0;

expenses.forEach((item,index)=>{
if(
!item.title.toLowerCase().includes(search)
){
return;
}

if(
filter!="All" &&
item.category!=filter
){
return;
}

total+=Number(item.amount);

let icon = "📦";

if(item.category=="Food") icon="🍔";
if(item.category=="Travel") icon="✈️";
if(item.category=="Shopping") icon="🛍️";
if(item.category=="Bills") icon="💡";

list.innerHTML += `
<li class="expense-item">

<div class="left">
<h3>${icon} ${item.title}</h3>
<p>📂 ${item.category}</p>
<small>📅 ${item.date}</small>
</div>

<div class="right">

<h3>₹${item.amount}</h3>

<div class="action-btns">

<button class="edit-btn" onclick="editExpense(${index})">
✏️
</button>

<button class="delete-btn" onclick="deleteExpense(${index})">
🗑️
</button>

</div>

</div>

</li>
`;

});
if(list.innerHTML==""){

list.innerHTML=`
<div class="empty-state">

<div class="empty-icon">💳</div>

<h2>No Transactions Yet</h2>

<p>Add your first expense to get started.</p>

</div>
`;

}
}
let editIndex = -1;

function editExpense(index){

    editIndex = index;

    let item = expenses[index];

    document.getElementById("editTitle").value = item.title;

    document.getElementById("editAmount").value = item.amount;

    document.getElementById("editCategory").value = item.category;

    document.getElementById("editPopup").style.display = "flex";
}
function saveEdit(){

    expenses[editIndex].title =
    document.getElementById("editTitle").value;

    expenses[editIndex].amount =
    document.getElementById("editAmount").value;

    expenses[editIndex].category =
    document.getElementById("editCategory").value;
    updateGoal();
updateStats();
    save();

    showExpense();

    updateDashboard();

    updateChart();

    closeEditPopup();

}

function closeEditPopup(){

    document.getElementById("editPopup").style.display =
    "none";

}
function openPopup(){
document.getElementById("popup").style.display="flex";
}

function closePopup(){
document.getElementById("popup").style.display="none";
}
function logout(){

    localStorage.removeItem("userName");

    window.location.replace("Login.html");

}

function toggleTheme(){

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
);

}

if(localStorage.getItem("theme")=="true"){
document.body.classList.add("dark");
}
const mode = localStorage.getItem("appMode");

if(mode === "expense"){

    // Hide only income card
    document.getElementById("incomeSection").style.display = "none";

    // Keep balance visible
    document.getElementById("balanceSection").style.display = "block";

    // Expand expense card
    document.querySelector(".cards").style.gridTemplateColumns = "1fr";

    document.querySelector(".expense-card").style.width = "100%";

    document.querySelector(".expense-card").style.maxWidth = "100%";
}

    function updateDashboard() {

    let incomes =
JSON.parse(localStorage.getItem("incomes")) || [];

let income = 0;

incomes.forEach(item=>{
    income += Number(item.amount);
});

    let expense = 0;

    expenses.forEach(item => {
        expense += Number(item.amount);
    });

    let balance = income - expense;

    document.getElementById("balanceIncome").textContent = "₹" + income;
    document.getElementById("balanceExpense").textContent = "₹" + expense;

    document.getElementById("cardIncome").textContent = "₹" + income;
    document.getElementById("CardExpense").textContent = "₹" + expense;

    document.getElementById("balance").textContent = "₹" + balance;

    document.getElementById("totalTransactions").textContent = expenses.length;
    let trend = calculateIncomeTrend();

document.querySelector(".trend-up").innerHTML =
`<i class="fa-solid fa-arrow-up"></i> +${trend}% from last month`;
document.getElementById("growthPercent").textContent =
`+${trend}% This Month`;
let expenseTrend = calculateExpenseTrend();

document.querySelector(".trend-down").innerHTML =
`<i class="fa-solid fa-arrow-down"></i> ${expenseTrend}% from last month`;
}
    
function updateChart() {

    if (typeof chart === "undefined") return;

    let data = {
        Food: 0,
        Travel: 0,
        Shopping: 0,
        Bills: 0,
        Other: 0
    };

    expenses.forEach(item => {
        data[item.category] += Number(item.amount);
    });

    chart.data.datasets[0].data = [
        data.Food,
        data.Travel,
        data.Shopping,
        data.Bills,
        data.Other
    ];

    chart.update();
}
function addIncome() {
    document.getElementById("incomePopup").style.display = "flex";
}

function closeIncomePopup() {
    document.getElementById("incomePopup").style.display = "none";
}

function saveIncome() {

    let amount = Number(document.getElementById("incomeAmount").value);

    if(amount <= 0){
        alert("Enter a valid income.");
        return;
    }

    let incomes =
    JSON.parse(localStorage.getItem("incomes")) || [];

    incomes.push({
        amount: amount,
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });

    localStorage.setItem("incomes", JSON.stringify(incomes));

    updateDashboard();
    updateGoal();
    updateStats();
    document.getElementById("incomeAmount").value = "";

    closeIncomePopup();
}
function calculateIncomeTrend(){

    let incomes =
    JSON.parse(localStorage.getItem("incomes")) || [];

    let now = new Date();

    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    let lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    let lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentTotal = 0;
    let lastTotal = 0;

    incomes.forEach(item => {

        if(item.month === currentMonth &&
           item.year === currentYear){
            currentTotal += Number(item.amount);
        }

        if(item.month === lastMonth &&
           item.year === lastYear){
            lastTotal += Number(item.amount);
        }
    });

    if(lastTotal === 0) return 100;

    return (
        ((currentTotal - lastTotal) / lastTotal) * 100
    ).toFixed(1);
}
function calculateExpenseTrend(){

    let now = new Date();

    let currentMonth = now.getMonth();
    let currentYear = now.getFullYear();

    let lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    let lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentTotal = 0;
    let lastTotal = 0;

    expenses.forEach(item => {

        if(item.month === currentMonth &&
           item.year === currentYear){
            currentTotal += Number(item.amount);
        }

        if(item.month === lastMonth &&
           item.year === lastYear){
            lastTotal += Number(item.amount);
        }

    });

    if(lastTotal === 0) return 0;

    return (
        ((currentTotal - lastTotal) / lastTotal) * 100
    ).toFixed(1);
}
function updateGoal(){

    let goal = Number(localStorage.getItem("goalTarget")) || 0;

    let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

    let income = 0;
    let expense = 0;

    incomes.forEach(item=>{
        income += Number(item.amount);
    });

    expenses.forEach(item=>{
        expense += Number(item.amount);
    });

    let saved = income - expense;

    if(saved < 0) saved = 0;

    let percent = goal > 0 ? (saved / goal) * 100 : 0;

    if(percent > 100) percent = 100;

    document.getElementById("goalDisplay").innerText =
        "₹" + saved.toLocaleString() + " / ₹" + goal.toLocaleString();

    document.getElementById("goalPercent").innerText =
        Math.round(percent) + "%";

    document.getElementById("goalProgress").style.width =
        percent + "%";
}
function updateStats(){

    let today = 0;
    let week = 0;
    let month = 0;

    const now = new Date();

    expenses.forEach(item=>{

        const expenseDate = new Date(item.date);

        // Today
        if(expenseDate.toDateString() === now.toDateString()){
            today += Number(item.amount);
        }

        // This Month
        if(
            expenseDate.getMonth() === now.getMonth() &&
            expenseDate.getFullYear() === now.getFullYear()
        ){
            month += Number(item.amount);
        }

        // Last 7 Days
        const diff =
        (now - expenseDate) / (1000*60*60*24);

        if(diff <= 7 && diff >= 0){
            week += Number(item.amount);
        }

    });

    document.getElementById("todayExpense").innerText = "₹" + today;
    document.getElementById("weekExpense").innerText = "₹" + week;
    document.getElementById("monthExpense").innerText = "₹" + month;

}
async function loadProfileImage(){

    const url = await getProfileImage();

    if(url){
        document.getElementById("headerProfile").src = url;
    }

}

loadProfileImage();