import { HeadphonesIcon } from "lucide-react";

export const LoginPrompt = () => {
  <div className="h-full flex flex-col items-center justify center p-6 text-center space-y-4">
    <div className="relative">
      <div
        className="absolute -insert-1 bg-linear-to-r from-emerald-500 to-sky-500 rounded-full blur-lg opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-62.5">
      <h3 className="text-lg font-semibold text-white">
        See what Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>;
};