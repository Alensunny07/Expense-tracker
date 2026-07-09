const expenses =
JSON.parse(localStorage.getItem("expenses")) || [];

const income =
Number(localStorage.getItem("income")) || 0;

const month = new Date().getMonth();
const year = new Date().getFullYear();

let totalExpense = 0;

let data = {
    Food:0,
    Travel:0,
    Shopping:0,
    Bills:0,
    Other:0
};

expenses.forEach(item=>{

    if(item.month == month && item.year == year){

        totalExpense += Number(item.amount);

        data[item.category] += Number(item.amount);

    }

});

let balance = income - totalExpense;

document.getElementById("monthIncome").innerText =
"₹" + income;

document.getElementById("monthExpense").innerText =
"₹" + totalExpense;

document.getElementById("monthBalance").innerText =
"₹" + balance;

const list =
document.getElementById("summary");

list.innerHTML = "";

for(let key in data){

    list.innerHTML += `
    <li style="
    background:#1E293B;
    margin:10px 0;
    padding:15px;
    border-radius:15px;
    list-style:none;">
        ${key} : ₹${data[key]}
    </li>
    `;
}

new Chart(document.getElementById("reportChart"),{
    type:"pie",
    data:{
        labels:Object.keys(data),
        datasets:[{
            data:Object.values(data)
        }]
    }
});