import axios from "axios";

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
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Failed to fetch playlists:", error);
  }
}
