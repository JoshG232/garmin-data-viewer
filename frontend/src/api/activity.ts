
import type { Activity } from '../Types/Activity'

const API_BASE_URL = "http://127.0.0.1:8000/api"

export const getActivities = async (): Promise<Activity[]> => {
    const response = await fetch(`${API_BASE_URL}/activities/fetch`)
    if (!response.ok) {
        throw new Error(`Failed to get activities: ${response.status} ${response.statusText}`)
    }

    const data: Activity[] = await response.json()
    return data
}