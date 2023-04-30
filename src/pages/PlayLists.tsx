import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

type Playlist = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    localized: {
      title: string;
      description: string;
    };
  };
};

type Props = {
  accessToken: string;
};

const PlayLists = ({ accessToken }: Props) => {
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get(
          "playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              part: "snippet",
              mine: true,
            },
          }
        );
        setPlaylists(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaylists();
  }, [accessToken]);

  const handleNavegateToPlaylistsVideos = (playlistId: string) => {
    navigate(`/playlist-videos/${playlistId}`);
  };

  return (
    <div className="py-6 bg-gray-900 text-gray-200 h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">My Playlists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="rounded-lg shadow-md overflow-hidden bg-gray-800"
              onClick={() => handleNavegateToPlaylistsVideos(playlist.id)}
            >
              <img
                src={playlist.snippet.thumbnails.medium.url}
                alt={playlist.snippet.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-lg font-medium">
                    {playlist.snippet.title}
                  </h2>
                </div>
                <a
                  href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Open Playlist
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayLists;
