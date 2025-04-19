import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase-config.js';  

export const authenticateAdmin = async (email, password) => {
  const docRef = doc(db, "Admin_login", "Sankalp-Dawada");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const adminData = docSnap.data();
    return email === adminData.Email && password === adminData.Password;
  } else {
    return false;
  }
};
