import PlayLists from "./pages/PlayLists";
import SignInWithGoogle from "./pages/SignInWithGoogle";
import { useTokenUserStore } from "./store/tokenUserSlice";
import "./styles/main.css";

function App() {
  const { token } = useTokenUserStore();

  return (
    <>
      {token ? (
        <PlayLists accessToken={token} />
      ) : (
        <SignInWithGoogle />
      )}
    </>
  );
}

export default App;
