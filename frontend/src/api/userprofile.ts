
import type { UserProfile } from '../Types/UserProfile'

const API_BASE_URL = "http://127.0.0.1:8000/api"

export const getUserProfile = async (): Promise<UserProfile> => {
    const response = await fetch(`${API_BASE_URL}/userprofile/get`)
    if (!response.ok) {
        throw new Error(`Failed to get user profile: ${response.status} ${response.statusText}`)
    }

    const data: UserProfile = await response.json()
    return data
}