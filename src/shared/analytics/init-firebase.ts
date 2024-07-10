import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics and get a reference to the service
export const analytics = getAnalytics(app);
