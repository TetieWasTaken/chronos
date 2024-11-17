import { requestData } from "./firebase/requestData";
import { addData } from "./firebase/addData";
import type { APIScheduleItem, ScheduleItem } from "@/types";

// Helper class for adding and requesting calendar data from Firestore
// It stores the user id and uses that to access the Firestore collection
class Calendar {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * @internal
   * @param {APIScheduleItem} data - The original data to be sanitised
   * @returns {APIScheduleItem} - The sanitised data
   */
  private sanitiseData(data: APIScheduleItem): APIScheduleItem {
    return Object.fromEntries(
      Object.entries(data).filter(([, value]) =>
        value !== undefined && value !== ""
      ),
    ) as APIScheduleItem;
  }

  /**
   * Request calendar data from Firestore
   * @returns {Promise<ScheduleItem[]>} - An array of objects from the Firestore collection
   */
  getCalendar(): Promise<ScheduleItem[]> {
    return requestData(`users/${this.userId}/schedule`) as Promise<
      ScheduleItem[]
    >;
  }

  /**
   * Add calendar data to Firestore
   * @param {APIScheduleItem} data - The data to add to Firestore
   * @returns {Promise<string>} - A promise that resolves with the ID of the added data
   */
  async addAssignment(data: APIScheduleItem): Promise<string> {
    data = this.sanitiseData(data);
    const ref = await addData(`users/${this.userId}/schedule`, data);
    if (!ref) {
      throw new Error("Failed to add data");
    }

    return ref.id;
  }
}

export { Calendar };
