import { db, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import { storage } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Save Expense
export async function saveExpense(expense){

    const user = auth.currentUser;

    if(!user){
        alert("Please login first.");
        return;
    }

    await addDoc(
        collection(db,"users",user.uid,"expenses"),
        expense
    );

}

// Load Expenses
export async function loadExpenses(){

    const user = auth.currentUser;

    if(!user) return [];

    const snapshot =
    await getDocs(
        collection(db,"users",user.uid,"expenses")
    );

    let expenses=[];

    snapshot.forEach(doc=>{

        expenses.push({
            id:doc.id,
            ...doc.data()
        });

    });

    return expenses;

}

// Delete Expense
export async function removeExpense(id){

    const user = auth.currentUser;

    await deleteDoc(
        doc(db,"users",user.uid,"expenses",id)
    );

}
export async function uploadProfileImage(file){

    const user = auth.currentUser;

    if(!user) return null;

    const imageRef =
    ref(storage,"profiles/"+user.uid);

    await uploadBytes(imageRef,file);

    const url =
    await getDownloadURL(imageRef);

    await setDoc(
        doc(db,"users",user.uid),
        {
            profilePhoto:url
        },
        {merge:true}
    );

    return url;
}

export async function getProfileImage(){

    const user = auth.currentUser;

    if(!user) return null;

    const snap =
    await getDoc(doc(db,"users",user.uid));

    if(!snap.exists()) return null;

    return snap.data().profilePhoto;
}