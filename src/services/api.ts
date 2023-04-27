import { OAuth2Client } from "google-auth-library";
import axios from "axios";

const API_KEY = "YOUR_API_KEY";
const CLIENT_ID = "YOUR_CLIENT_ID";
const SCOPE = "https://www.googleapis.com/auth/youtube.readonly";

const client = new OAuth2Client(CLIENT_ID);

export async function signIn() {
  try {
    const url = client.generateAuthUrl({ access_type: "offline", scope: SCOPE });
    window.location.assign(url);
  } catch (error) {
    console.error("Failed to sign in:", error);
  }
}

export async function fetchMyPlaylists(accessToken: string) {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: "snippet",
        mine: true,
        maxResults: 50,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Failed to fetch playlists:", error);
  }
}
