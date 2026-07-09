import {
    uploadProfileImage,
    getProfileImage
} from "./database.js";
const user =
localStorage.getItem("userName") || "User";
const savedImage = localStorage.getItem("headerProfile");

if(savedImage){
    document.getElementById("headerProfile").src = savedImage;
}
document.getElementById("userName").innerHTML =
user;

document.getElementById("occupationText").innerHTML =
(localStorage.getItem("occupation") || "Student")
+ " • " +
(localStorage.getItem("location") || "India");

document.getElementById("goalValue").innerHTML =
localStorage.getItem("goal") ||
"No Goal Set";

document.getElementById("aboutValue").innerHTML =
localStorage.getItem("about") ||
"Tell us about yourself.";

function logout(){

    localStorage.removeItem("userName");

    window.location.href =
    "Login.html";
}
function saveGoal(){

    let goal = Number(document.getElementById("goalInput").value);

    if(goal <= 0){
        alert("Enter a valid goal");
        return;
    }

    localStorage.setItem("goalTarget", goal);

    document.getElementById("goalDisplay").textContent =
    "₹" + goal.toLocaleString();
}
async function changeHeaderProfile(event){

    const file = event.target.files[0];

    if(!file) return;

    const url = await uploadProfileImage(file);

    if(url){
        document.getElementById("headerProfile").src = url;
    }

}
async function loadProfile(){

    const url = await getProfileImage();

    if(url){
        document.getElementById("headerProfile").src = url;
    }

}

loadProfile();
window.changeHeaderProfile = changeHeaderProfile;
window.logout = logout;
window.saveGoal = saveGoal;
function loadStats(){

    const incomes =
    JSON.parse(localStorage.getItem("incomes")) || [];

    const expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

    let income=0;
    let expense=0;

    incomes.forEach(i=>income+=Number(i.amount));
    expenses.forEach(e=>expense+=Number(e.amount));

    document.getElementById("income").textContent="₹"+income;
    document.getElementById("expense").textContent="₹"+expense;
    document.getElementById("balance").textContent="₹"+(income-expense);
    document.getElementById("transactions").textContent=expenses.length;
}

loadStats();