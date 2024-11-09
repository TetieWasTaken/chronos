import { requestData } from "./requestData";
import { addData } from "./addData";

// Helper class for adding and requesting calendar data from Firestore
// It stores the user id and uses that to access the Firestore collection
class Calendar {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Request calendar data from Firestore
   * @returns {Promise<Object[]>} - An array of objects from the Firestore collection
   */
  async getCalendar(): Promise<Object[]> {
    return requestData(`schedules/${this.userId}/assignments`);
  }

  /**
   * Add calendar data to Firestore
   * @param {Object} data - The data to add to Firestore
   * @returns {Promise<void>} - A promise that resolves when the data has been added to Firestore
   */
  async addAssignment(data: Object): Promise<void> {
    await addData(`schedules/${this.userId}/assignments`, data);
  }
}

export { Calendar };
