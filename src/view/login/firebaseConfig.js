import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBAXD84wkQaocBUTpSgdBL1LuFljWv8Id4",
    authDomain: "fir-webplatzi-94990.firebaseapp.com",
    databaseURL: "https://fir-webplatzi-94990.firebaseio.com",
    projectId: "fir-webplatzi-94990",
    storageBucket: "fir-webplatzi-94990.appspot.com",
    messagingSenderId: "213183323242",
    appId: "1:213183323242:web:ddd8b79b0a815615db3e13",
    measurementId: "G-L2P07ZM3D0"
}

firebase.initializeApp(firebaseConfig)

export default firebase;