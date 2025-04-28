
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCiLYU18yz-YDd6WiyNOIyvnm94euHpdBU",
    authDomain: "hms-project-f7ae2.firebaseapp.com",
    databaseURL: "https://hms-project-f7ae2-default-rtdb.firebaseio.com",
    projectId: "hms-project-f7ae2",
    storageBucket: "hms-project-f7ae2.firebasestorage.app",
    messagingSenderId: "273862548381",
    appId: "1:273862548381:web:e9a7fbc201776ab947ed74",
    measurementId: "G-Y8VT0PP25R"
  };

const app = initializeApp(firebaseConfig);

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const Name = document.getElementById('name').value;
    const repeat_password = document.getElementById('repeat-password').value;


    const auth = getAuth();
    const db = getFirestore();

    if (password === repeat_password) {

        createUserWithEmailAndPassword(auth, email, password, Name, repeat_password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: email,
                    Name: Name,
                    password: password
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

    }
    else {

        alert("Password do not match");
    }



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
