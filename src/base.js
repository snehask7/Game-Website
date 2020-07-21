import * as firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyDhApIhUBeJVEc69zXdh6JQh8kNrmdD994",
    authDomain: "multiplayer-games-dd488.firebaseapp.com",
    databaseURL: "https://multiplayer-games-dd488.firebaseio.com",
    projectId: "multiplayer-games-dd488",
    storageBucket: "multiplayer-games-dd488.appspot.com",
    messagingSenderId: "103125647947",
    appId: "1:103125647947:web:d6191cde1f4c5342d003ce"
};

const app=firebase.initializeApp(config)
export default app;