import { useSignIn } from "@clerk/react";
import { Button } from "./ui/button.tsx";

const SignInOAuthButtons = () => {
  const { signIn } = useSignIn();

  if (!signIn) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.sso({
      strategy: "oauth_google",
      redirectUrl: "/auth-callback",
      redirectCallbackUrl: "/sso-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
    >
      <img src="/google.png" alt="Google" className="size-5 mr-2" />
      Continue with Google
    </Button>
  );
};

export default SignInOAuthButtons;
