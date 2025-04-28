// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiLYU18yz-YDd6WiyNOIyvnm94euHpdBU",
  authDomain: "hms-project-f7ae2.firebaseapp.com",
  projectId: "hms-project-f7ae2",
  storageBucket: "hms-project-f7ae2.firebasestorage.app",
  messagingSenderId: "273862548381",
  appId: "1:273862548381:web:e9a7fbc201776ab947ed74",
  measurementId: "G-Y8VT0PP25R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const Name = document.getElementById('name').value;
    const Phone_No = document.getElementById('pno').value;
    const Birth_date = document.getElementById('dob').value;
    const Gender = document.getElementById('gen').value;
    const streetaddress = document.getElementById('streetad').value;
    const streetaddress2 = document.getElementById('streetadd2').value;
    const Country = document.getElementById('add').value;
    const City = document.getElementById('city').value;
    const region = document.getElementById('region').value;
    const postalcode = document.getElementById('pc').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    

    
    function clearfields() {
      let inputs = document.querySelectorAll('input');
      inputs.forEach((input) => input.value = "");
  }
    

    const auth = getAuth();
    const db = getFirestore();

  
        createUserWithEmailAndPassword(auth, password, confirm_password, email, Name, Phone_No, Birth_date, Gender, streetaddress, streetaddress2, Country, City, region, postalcode)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: email,
                    Name: Name,
                    password: password,
                    confirm_password: confirm_password,
                    Phone_No: Phone_No,
                    Date_of_birth: Birth_date,
                    Gender: Gender,
                    streetaddress: streetaddress, 
                    streetaddress2: streetaddress2, 
                    region: region, 
                    postal_code: postalcode, 
                    City: City, 
                    Country: Country
                };

                showMessage('Account Created Successfully', 'signUpMessage');
                const docRef = doc(db, "users", user.uid);
                setDoc(docRef, userData)
                    .then(() => {
                        window.location.href = 'Loginindex.html';
                    })
                    .catch((error) => {
                        console.error("error writing document", error);

                    });

            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode == 'auth/email-already-in-use') {
                    showMessage('Email Address Already Exists !!!', 'signUpMessage');
                    clearfields();
                }
                else {
                    showMessage('unable to create User', 'signUpMessage');
                }
                clearfields();
            })

    
    



    function showMessage(message, divId) {
        var messageDiv = document.getElementById(divId);
        messageDiv.style.display = "block";
        // messageDiv.innerHTML=message;

        alert(message);
        clearfields();

        messageDiv.style.opacity = 1;

        // setTimeout(function(){
        //     messageDiv.style.opacity=0;
        // },5000);

    }
});
