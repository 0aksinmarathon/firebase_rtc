import firebase from "firebase/app";
import "firebase/database";

export default class FirebaseSignalingClient {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDPbhsB_mrNdnHpZ3cRjPJvyyNom8P6uy0",
      authDomain: "fir-rtc-2960f.firebaseapp.com",
      databaseURL: "https://fir-rtc-2960f-default-rtdb.firebaseio.com",
      projectId: "fir-rtc-2960f",
      storageBucket: "fir-rtc-2960f.appspot.com",
      messagingSenderId: "626596140890",
      appId: "1:626596140890:web:26f4a59ba67d58420e4563",
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.database = firebase.database();
    this.localPeerName = "";
    this.remotePeerName = "";
  }

  setPeerName(localPeerName, remotePeerName) {
    this.localPeerName = localPeerName;
    this.remotePeerName = remotePeerName;
  }

  get targetRef() {
    return this.databse.ref(this.remotePeerName);
  }

  async sendOffer(sessionDescription) {
    this.targetRef = this.databse.ref(this.remotePeerName);
    await targetRef.set({
      type: "offer",
      sender: this.localPeerName,
      sessionDescription,
    });
  }
}
