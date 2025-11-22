// js/booking.js
import { db } from "./firebase-config.js";
import { doc, runTransaction, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

/**
 * Reserve a parking spot using Firestore Transaction
 */
export async function reserveSpot({ userId, lotId, spotId, startTime, endTime, amount }) {

  const spotRef = doc(db, `parkingLots/${lotId}/spots/${spotId}`);
  const bookingRef = doc(collection(db, "bookings")); // create ID but do not write yet

  return await runTransaction(db, async (t) => {
    const spotSnap = await t.get(spotRef);

    if (!spotSnap.exists()) {
      throw new Error("Spot does not exist");
    }

    const status = spotSnap.data().status;
    if (status !== "available") {
      throw new Error("Spot not available");
    }

    // Mark spot as reserved
    t.update(spotRef, {
      status: "reserved",
      lastUpdated: serverTimestamp()
    });

    // Create booking safely inside transaction
    t.set(bookingRef, {
      userId,
      lotId,
      spotId,
      startTime,
      endTime,
      amount,
      status: "pending",  
      createdAt: serverTimestamp()
    });

    return bookingRef.id;
  });
}
