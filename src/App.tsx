import { useCallback, useEffect, useState } from "react";
import PlayLists from "./pages/PlayLists";
import SignInWithGoogle from "./pages/SignInWithGoogle";
import { useTokenUserStore } from "./store/tokenUserSlice";
import "./styles/main.css";

function App() {
  const { token, setToken } = useTokenUserStore();

  const [loading, setLoading] = useState(true);

  const loadToken = useCallback(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, [setToken]);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  if (loading) {
    return null;
  }

  return (
    <>{token ? <PlayLists accessToken={token} /> : <SignInWithGoogle />}</>
  );
}

export default App;
