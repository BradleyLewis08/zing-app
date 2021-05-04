import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyB7Qk-6SuOzrX22m4I0DYVOcu0PeaVXN8g",
    authDomain: "zingapplication-70251.firebaseapp.com",
    projectId: "zingapplication-70251",
    storageBucket: "zingapplication-70251.appspot.com",
    messagingSenderId: '326609409889',
    appId: '1:326609409889:ios:a320db79924a1de3921720',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };