import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import PlaylistVideos from "./pages/PlaylistVideos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/playlist-videos/:playlistId"
          element={<PlaylistVideos />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
