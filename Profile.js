const user =
localStorage.getItem("userName") || "User";

document.getElementById("userName").innerHTML =
user;

document.getElementById("avatar").innerHTML =
user.charAt(0).toUpperCase();

document.getElementById("occupationText").innerHTML =
(localStorage.getItem("occupation") || "Student")
+ " • " +
(localStorage.getItem("location") || "India");

document.getElementById("goalText").innerHTML =
localStorage.getItem("goal") ||
"No Goal Set";

document.getElementById("aboutText").innerHTML =
localStorage.getItem("about") ||
"Tell us about yourself.";

function logout(){

    localStorage.removeItem("userName");

    window.location.href =
    "Login.html";
}
function saveGoal(){

    let goal =
    document.getElementById("goalInput").value;

    if(!goal || goal <= 0){
        alert("Enter a valid goal");
        return;
    }

    localStorage.setItem("goalTarget", goal);

    document.getElementById("goalDisplay").innerHTML =
    "₹" + Number(goal).toLocaleString();

    document.getElementById("goalStatus").innerHTML =
    "Goal Updated Successfully";

    document.getElementById("goalProgress").style.width =
    "100%";
}
let savedGoal =
localStorage.getItem("goalTarget");

if(savedGoal){

    document.getElementById("goalDisplay").innerHTML =
    "₹" + Number(savedGoal).toLocaleString();
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