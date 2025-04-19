import { db } from './firebase-config.js';

export const authenticateAdmin = async (email, password) => {
  try {
    const docRef = db.collection("Admin_login").doc("Sankalp-Dawada");
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const adminData = docSnap.data();
      return email === adminData.Email && password === adminData.Password;
    } else {
      console.log("No such document!");
      return false;
    }
  } catch (error) {
    console.error("Error authenticating:", error);
    return false;
  }
};