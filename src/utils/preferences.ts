import { requestData } from "./firebase/requestData";
import type { APIPreferencesType, PreferencesType } from "@/types";

class Preferences {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getPreferences(): Promise<PreferencesType> {
    const data = requestData(
      `users/${this.userId}/preferences`,
    ) as Promise<APIPreferencesType[]>;

    // Convert array to object, with the id as the key
    return data.then((data) => {
      return data.reduce((acc, cur) => {
        return { ...acc, [cur.id]: cur };
      }, {} as PreferencesType);
    });
  }
}

export { Preferences };
