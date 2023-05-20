import { SunIcon } from "@heroicons/react/solid";

function Loading() {
  return (
    <div className="justify-center bg-gradient-to-br from-[#375374] to-slate-800 flex items-center min-h-screen flex-col text-slate-200 p-5">
      <SunIcon
        className="h-24 w-24 animate-bounce text-yellow-400"
        color="yellow"
      />
      <h1 className="text-3xl text-slate-100 font-semibold text-center animate-pulse mb-10">
        Fetching weather information
      </h1>
      <h2 className="text-2xl font-medium text-center">
        Please hold on, we are generating an AI Summary report 😉
      </h2>
    </div> 
  );
}

export default Loading;
