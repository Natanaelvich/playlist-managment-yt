import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const SignInWithGoogle = () => {
  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
  };

  const errorMessage = () => {
    console.log("error");
  };

  return (
    <div className="bg-gradient-to-r from-purple-900 to-purple-500 h-screen flex flex-col justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-white font-bold mb-6">Playlist Manager</h1>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </div>

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
