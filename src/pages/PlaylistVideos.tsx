import axios from "axios";
import { useState, useEffect } from "react";

type Video = {
  id: string;
  snippet: {
    title: string;
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
    };
    channelTitle: string;
  };
};

type Props = {
  accessToken: string;
  playlistId: string;
  onClose: () => void;
};

const PlaylistVideos = ({ accessToken, playlistId, onClose }: Props) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/playlistItems",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              part: "snippet",
              playlistId,
              maxResults: 50,
            },
          }
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlaylistVideos();
  }, [accessToken, playlistId]);

  return (
    <div className="w-full h-full flex justify-center items-center z-50 bg-gray-900 bg-opacity-80">
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-gray-200">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-200 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M6.7 5.3a.996.996 0 000 1.41L11.59 12 6.7 16.89a.996.996 0 101.41 1.41L13 13.41l4.89 4.88a.996.996 0 101.41-1.41L14.41 12l4.88-4.89a.996.996 0 10-1.41-1.41L13 10.59 8.11 5.7a.996.996 0 00-1.41 0z"
            />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">
            Playlist Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-200">
                    {video.snippet.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {video.snippet.channelTitle}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium mt-4 inline-block"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideos;
