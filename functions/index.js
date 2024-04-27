/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {getFirestore, doc, setDoc} = require('firebase-admin/firestore');
//const {onRequest} = require("firebase-functions/v2/https");
const {onCall} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
admin.initializeApp();

// Initialize Firestore
const db = getFirestore();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.cloudGetCourses = onCall(async (data, context) => {
    
    // Query the 'kurser' collection
    const snapshot = await db.collection('kurser').get();
    
    // Map the documents to their data
    const courses = snapshot.docs.map(doc => doc.data());
    
    // Return the courses data
    return { courses };
  });

exports.cloudAddArrayFieldToDocument = onCall(async (data, context) => {
    const { collectionID, documentName, fieldValue1, fieldValue2, fieldValue3 } = data;

    try {
    const docRef = doc(db, collectionID, documentName);
    const updateObject = {};
    updateObject[fieldValue1] = [fieldValue1, fieldValue2, fieldValue3];

    await setDoc(docRef, updateObject, { merge: true });
    return { message: "Array field added/updated successfully" };
    } catch (error) {
    console.error("Error adding array field:", error);
    throw new functions.https.HttpsError('unknown', 'Failed to add/update array field', error);
    }
});



