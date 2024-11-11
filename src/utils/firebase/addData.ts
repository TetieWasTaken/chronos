import { firestore } from "./init";
import { addDoc, collection } from "firebase/firestore";

/**
 * @internal
 * Add data to Firestore
 * @param {string} collectionPath - The path to the collection in Firestore
 * @param {object} data - The data to add to Firestore
 * @returns {Promise<void>} - A promise that resolves when the data has been added to Firestore
 */
async function addData(collectionPath: string, data: object): Promise<void> {
  await addDoc(collection(firestore, collectionPath), data);
}

export { addData };
