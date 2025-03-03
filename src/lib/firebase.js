import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
// Firebase yapılandırma ayarları
const firebaseConfig = {
  apiKey: "AIzaSyCGFDbLSzZyHuYfJauwk6W-Q5AvT5q32eA",
  authDomain: "food-recipe-new-bb072.firebaseapp.com",
  databaseURL: "https://food-recipe-new-bb072-default-rtdb.firebaseio.com",
  projectId: "food-recipe-new-bb072",
  storageBucket: "food-recipe-new-bb072.appspot.com",
  messagingSenderId: "942335393332",
  appId: "1:942335393332:web:6b98e30c5704b8dcf21461"
};

let app;
// Eğer daha önce bir Firebase uygulaması başlatılmadıysa yeni bir uygulama başlat
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Zaten başlatılmış bir uygulama varsa onu kullan
}
// Firebase Realtime Database bağlantısını başlat
const database = getDatabase(app);

export { database, ref, push, onValue };
