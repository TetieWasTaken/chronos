import { firestore } from "./init";
import { collection, getDocs } from "firebase/firestore";

/**
 * @internal
 * Request data from Firestore
 * @param {string} collectionPath - The path to the collection in Firestore
 * @returns {Promise<Object[]>} - An array of objects from the Firestore collection
 */
async function requestData(collectionPath: string): Promise<Object[]> {
  const querySnapshot = await getDocs(collection(firestore, collectionPath));
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
}

export { requestData };
