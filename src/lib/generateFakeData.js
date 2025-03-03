import { database, ref, push } from "./firebase";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Firebase Realtime Database'e sahte veri ekleyen fonksiyon
 */
export const addFakeData = () => {
  
  const newData = {
    value: getRandomNumber(1, 100),
    timestamp: new Date().toISOString(),
  };
  const dataRef = ref(database, 'dashboard-data');
  push(dataRef, newData); // Yeni veriyi Firebase Realtime Database'e ekle
};
