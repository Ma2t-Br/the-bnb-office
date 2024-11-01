import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB5VrBSkVM79WFu1ZBiMVFOhlX2LGZiGUg",
  authDomain: "the-bnb-office.firebaseapp.com",
  databaseURL: "https://the-bnb-office-default-rtdb.firebaseio.com",
  projectId: "the-bnb-office",
  storageBucket: "the-bnb-office.firebasestorage.app",
  messagingSenderId: "978807975538",
  appId: "1:978807975538:web:30e2fec0fc5a3fa1b35ceb",
  measurementId: "G-CQZHMXLSRS"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);