import axios from "axios";

const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

api.interceptors.response.use(
  async (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export async function fetchMyPlaylists(accessToken: string) {
  try {
    const response = await api.get("playlists", {
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

export default api;
