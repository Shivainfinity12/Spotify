import { Link } from "react-router";
import { LayoutDashboardIcon } from "lucide-react";
import SignInOAuthButtons from "./SignInOAuthButton.tsx";
import {
  Show,
  UserButton,
} from "@clerk/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "cn";
import { buttonVariants } from "./ui/button.tsx";

const topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 rounded-md">
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" alt="Spotify logo" className="size-8" />
        Spotify
      </div>
      <div className="flex items-center gap-4">
        <Show when="signed-out">
          {/* <SignInButton forceRedirectUrl="/auth-callback" /> */}
          <div className="flex items-center gap-2">
            <SignInOAuthButtons />
          </div>
          {/* <SignUpButton forceRedirectUrl="/auth-callback" /> */}
        </Show>
        <Show when="signed-in">
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to={"/admin"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <LayoutDashboardIcon className="size-4 mr-2" />
                <div className="hidden sm:inline">Admin Dashboard</div>
              </Link>
            )}
            <UserButton />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default topbar;
