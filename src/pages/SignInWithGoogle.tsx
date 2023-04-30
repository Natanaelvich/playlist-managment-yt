import { useGoogleLogin } from "@react-oauth/google";
import { useTokenUserStore } from "../store/tokenUserSlice";

const SignInWithGoogle = () => {
  const { setToken } = useTokenUserStore();

  const login = useGoogleLogin({
    flow : 'implicit',
    onSuccess: (tokenResponse) => setToken(tokenResponse.access_token),
    scope: "https://www.googleapis.com/auth/youtube",
  });

  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-500 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl text-white font-bold mb-6">Playlist Manager</h1>

      <button
        className="bg-white text-purple-900 px-4 py-2 rounded-lg shadow-lg flex"
        onClick={() => login()}
      >
        <img
          className="w-6 h-6 mr-2"
          src="https://img.icons8.com/color/48/000000/google-logo.png"
        />
        Login with Google
      </button>

      <footer className="text-center text-white mt-6">
        <p>
          Feito com <span className="text-red-500">&hearts;</span> por{" "}
          <a
            href="https://github.com/Natanaelvich"
            target="_blank"
            rel="noreferrer"
          >
            Natanael Lima
          </a>
        </p>
      </footer>
    </div>
  );
};

export default SignInWithGoogle;
