// admin.js
import { auth,db } from "../js/firebase-config.js";
import {
    collection,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


/**
 * Create a new parking lot
 */
export async function createParkingLot({ name, address, hourlyRate, totalSpots }) {
    const lotRef = doc(collection(db, "lots")); // auto ID

    await setDoc(lotRef, {
        name,
        address,
        hourlyRate,
        totalSpots,
        status: "active",
        createdAt: serverTimestamp()
    });

    return lotRef.id;
}

/**
 * Create a spot under a given lotId
 */
export async function createParkingSpot({ lotId, spotNumber }) {
    const spotRef = doc(collection(db, `lots/${lotId}/spots`)); // auto ID

    await setDoc(spotRef, {
        spotNumber,
        status: "available", // default
        lastUpdated: serverTimestamp()
    });

    return spotRef.id;
}
