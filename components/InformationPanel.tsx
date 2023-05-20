import Image from "next/image";
import CityPicker from "./CityPicker";
import weathercodeToString from "@/lib/weatherCodeToString";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

type Props = {
  city: string;
  lat: string;
  long: string;
  results: Root;
};

function InformationPanel({ city, lat, long, results }: Props) {
  return (
    <div className=" bg-gradient-to-br from-[#375374] to-slate-800 text-white p-7 min-h-screen">
      <div className="pb-5">
        <h1 className="text-6xl font-semibold w-64">{decodeURI(city)}</h1>
        <p className="text-xs text-gray-300 py-3">
          Long/Lat: {long}/{lat}
        </p>
      </div>
      <CityPicker />
      <hr className="my-8" />

      <div className="mt-4 flex justify-between items-center space-x-10 mb-5">
        <div>
          <p className="text-xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-extralight">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </p>
        </div>
        <p className="font-semibold text-xl uppercase">
          {new Date().toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </p>
      </div>
      <hr className="mt-10 mb-5" />

      <div className={"flex items-center justify-between"}>
        <div>
          <Image
            src={`https://weatherbit.io/static/img/icons/${
              weathercodeToString[results.current_weather.weathercode].icon
            }.png`}
            alt={weathercodeToString[results.current_weather.weathercode].label}
            height={75}
            width={75}
          />

          <div className="flex items-center justify-between space-x-10">
            <p className="text-4xl font-semibold">
              {results.current_weather.temperature.toFixed(1)}°C
            </p>
            <p className="font-extralight text-right">
              {weathercodeToString[results.current_weather.weathercode].label}
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 space-y-4">
        <div className="flex items-center space-x-2 px-4 py-3 border border-gray-400 rounded-md bg-slate-800">
          <SunIcon className="h-8 w-8 text-yellow-300" />
          <div className="flex flex-1 justify-between items-center flex-wrap">
            <p className="font-extralight">Sunrise</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunrise[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                hour12: true,
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-3 border border-gray-400 rounded-md bg-slate-800">
          <MoonIcon className="h-8 w-8 text-slate-300" />
          <div className="flex flex-1 justify-between items-center flex-wrap">
            <p className="font-extralight">Sunset</p>
            <p className="uppercase text-2xl">
              {new Date(results.daily.sunset[0]).toLocaleTimeString("en-GB", {
                hour: "numeric",
                hour12: true,
                minute: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InformationPanel;
