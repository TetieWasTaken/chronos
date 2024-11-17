import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "./init";

/**
 * @internal
 * Update data in Firestore
 * @param {string} documentPath - The path to the document in Firestore
 * @param {object} data - The data to update in Firestore
 * @returns {Promise<void>} - A promise that resolves when the data has been updated in Firestore
 */
async function updateData(documentPath: string, data: object): Promise<void> {
  const docRef = doc(firestore, documentPath);
  await updateDoc(docRef, data);
}

export { updateData };
