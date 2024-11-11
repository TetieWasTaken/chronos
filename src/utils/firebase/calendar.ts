import { requestData } from "./requestData";
import { addData } from "./addData";
import type { ScheduleItem } from "@/types";

// Helper class for adding and requesting calendar data from Firestore
// It stores the user id and uses that to access the Firestore collection
class Calendar {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * @internal
   * @param {ScheduleItem} data - The original data to be sanitised
   * @returns {ScheduleItem} - The sanitised data
   */
  private sanitiseData(data: ScheduleItem): ScheduleItem {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as ScheduleItem;
  }

  /**
   * Request calendar data from Firestore
   * @returns {Promise<ScheduleItem[]>} - An array of objects from the Firestore collection
   */
  getCalendar(): Promise<ScheduleItem[]> {
    return requestData(`schedules/${this.userId}/assignments`) as Promise<
      ScheduleItem[]
    >;
  }

  /**
   * Add calendar data to Firestore
   * @param {ScheduleItem} data - The data to add to Firestore
   * @returns {Promise<void>} - A promise that resolves when the data has been added to Firestore
   */
  async addAssignment(data: ScheduleItem): Promise<void> {
    data = this.sanitiseData(data);
    await addData(`schedules/${this.userId}/assignments`, data);
  }
}

export { Calendar };
