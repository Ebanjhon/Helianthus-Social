
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBS1eLE5uWK37yoVk0Vy5OTaAIYj1xS3xg",
    authDomain: "message-social-5d4bd.firebaseapp.com",
    projectId: "message-social-5d4bd",
    storageBucket: "message-social-5d4bd.appspot.com",
    messagingSenderId: "991486997888",
    appId: "1:991486997888:web:21f0512e2a35dd0401bd65",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// export { firebase };