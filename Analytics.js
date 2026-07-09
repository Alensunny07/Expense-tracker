const expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

let totalExpense = 0;
let highest = 0;

let categoryCount = {
Food:0,
Travel:0,
Shopping:0,
Bills:0,
Other:0
};

expenses.forEach(item=>{

totalExpense += Number(item.amount);

if(Number(item.amount) > highest){
highest = Number(item.amount);
}

categoryCount[item.category]++;

});

let average = 0;

if(expenses.length > 0){
average = Math.round(totalExpense / expenses.length);
}

let topCategory = "None";
let max = 0;

for(let key in categoryCount){

if(categoryCount[key] > max){

max = categoryCount[key];

topCategory = key;

}

}

document.getElementById("totalTrans").innerText =
expenses.length;

document.getElementById("totalExpense").innerText =
"₹" + totalExpense;

document.getElementById("highestExpense").innerText =
"₹" + highest;

document.getElementById("averageExpense").innerText =
"₹" + average;

document.getElementById("topCategory").innerText =
topCategory;