import { collection, addDoc, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { CreditProfile } from "../types";

const COLLECTION_NAME = "assessments";

export async function saveAssessment(profile: CreditProfile, rawLogs: string[]) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...profile,
      rawLogs,
      createdAt: Timestamp.now(),
    });
    console.log("Assessment saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}

export async function getAssessmentHistory(): Promise<CreditProfile[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as CreditProfile[];
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
}
