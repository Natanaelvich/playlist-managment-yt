import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "react-feather";
import api from "../services/api";

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

type CheckedVideo = {
  id: string;
};

const PlaylistVideos = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkedVideos, setCheckedVideos] = useState<CheckedVideo[]>([]);

  const handleVideoChecked = (videoId: string, checked: boolean) => {
    if (checked) {
      setCheckedVideos([...checkedVideos, { id: videoId }]);
    } else {
      setCheckedVideos(checkedVideos.filter((video) => video.id !== videoId));
    }
  };

  const deleteVideosFromPlaylist = async () => {
    const videoIds = checkedVideos.map((video) => video.id);
    const token = localStorage.getItem("token");

    try {
      const response = await api.delete("playlistItems", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: videoIds.join(","),
        },
      });

      console.log(
        `Excluído com sucesso ${response.data.items.length} vídeos da playlist.`
      );

      setCheckedVideos([]);
      setVideos(videos.filter((video) => !videoIds.includes(video.id)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await api.get(
          "playlistItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              part: "snippet",
              playlistId,
              maxResults: 50,
            },
          }
        );

        const videosWithThumbnails = response.data.items.filter(
          (video: Video) => Object.keys(video.snippet.thumbnails).length > 0
        );

        setVideos(videosWithThumbnails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [playlistId]);

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-80">
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-gray-200 p-6">
          <div className="text-red-500 text-lg font-medium">{error}</div>
          <div className="mt-6">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen flex justify-center  bg-gray-900 bg-opacity-80">
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden text-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-200">
            Playlist Videos
          </h2>
          {loading ? (
            <div className="flex w-screen h-screen justify-center items-center bg-gray-900 bg-opacity-80 rounded-lg">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-700 rounded-lg shadow-md overflow-hidden relative"
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-48 object-cover"
                  />
                  <input
                    type="checkbox"
                    className="absolute top-2 right-2 w-5 h-5 appearance-none bg-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                    onChange={(e) =>
                      handleVideoChecked(video.id, e.target.checked)
                    }
                  />
                  <div className="p-4">
                    <h3
                      className="text-lg font-medium mb-2 text-gray-200 truncate"
                      title={video.snippet.title}
                    >
                      {video.snippet.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {checkedVideos.length > 0 && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-4 px-8 rounded-md text-2xl font-medium mt-4 fixed bottom-4 right-4 flex items-center space-x-4"
              onClick={deleteVideosFromPlaylist}
            >
              <Trash2 size={32} className="text-white w-12 h-12" />
              <span className="text-xl">Apagar Videos</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideos;
