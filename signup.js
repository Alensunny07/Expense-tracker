import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

window.signupUser = async function(){

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(!name || !email || !password || !confirm){
        alert("Please fill all fields.");
        return;
    }

    if(password !== confirm){
        alert("Passwords do not match.");
        return;
    }

    try{

        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(userCredential.user,{
            displayName:name
        });

        document.getElementById("successPopup").style.display = "flex";

    }catch(error){
        alert(error.message);
    }

}
window.goToDashboard = function(){
    window.location.href = "Dashboard.html";
}