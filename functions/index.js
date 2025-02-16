import * as functions from 'firebase-functions';
import {initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
initializeApp();

// Get Firestore instance
const db = getFirestore();

// Cloud Function to create user document when a new user signs up
export const createUserDocument = functions.auth.user().onCreate((user) => {
  // Get the user's email
  const {email} = user;

  // Reference to the user document in Firestore
  const userRef = db.collection('users').doc(user.uid);

  // Set the user's email in the database
  return userRef.set({
    email: email,
    createdAt: new Date(),
  }, {merge: true})
      .then(() => {
        console.log(`User document created for ${email}`);
        return null;
      })
      .catch((error) => {
        console.error('Error creating user document:', error);
        return null;
      });
});

// Log when the function is initialized
console.log('Firebase function "createUserDocument" initialized');
