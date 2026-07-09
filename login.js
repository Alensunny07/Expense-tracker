import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

window.loginUser = async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if(!email || !password){
        alert("Please enter email and password.");
        return;
    }

    try{
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "Dashboard.html";
    }catch(error){
        alert(error.message);
    }
}
const provider = new GoogleAuthProvider();

window.googleLogin = function () {
    signInWithRedirect(auth, provider);
};

getRedirectResult(auth)
.then((result) => {
    if (!result) return;

    const user = result.user;

    localStorage.setItem("userName", user.displayName);

    if (user.photoURL) {
        localStorage.setItem("headerProfile", user.photoURL);
    }

    window.location.href = "Dashboard.html";
})
.catch((error) => {
    alert(error.message);
});