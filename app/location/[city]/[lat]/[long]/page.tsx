import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InformationPanel from "@/components/InformationPanel";
import RainChart from "@/components/RainChart";
import StatsCard from "@/components/StatsCard";
import TempChart from "@/components/TempChart";
import { fetchWeatherQuery } from "@/graphql/queries/fetchWeatherQuery";

export const revalidate = 60;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

export async function generateMetadata({ params }: Props) {
  return {
    title: `Weather 247 - Weather reports for ${params.city}`,
  };
}

async function WeatherReports({ params }: Props) {
  const { long, lat, city } = params;
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
    },
  });

  const results: Root = data.myQuery;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <InformationPanel city={city} lat={lat} long={long} results={results} />
      <div className="flex-1 p-2 lg:p-10">
        <div className="p-2">
          <div className="pb-5">
            <h2 className="text-xl font-semibold">Todays overview</h2>
            <p className="py-2 text-sm text-gray-400">
              Last updated at:&nbsp;
              {new Date(results.current_weather.time).toLocaleString()}&nbsp;
              {results.timezone}
            </p>
          </div>
          <div className="m-2 mb-10">
            <CalloutCard
              message={`The Weather report live from Weather247 headquarters relating to current weather in ${city}`}
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatsCard
              title="Maximum temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°`}
              color="yellow"
            />
            <StatsCard
              title="Minimum temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°`}
              color="green"
            />
            <div>
              <StatsCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(1)}°`}
                color="rose"
              />
              {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                <CalloutCard
                  message="The UV is high today, be sure to wear SPF!"
                  warning
                />
              )}
            </div>
            <div className="flex sm:space-x-3 flex-wrap sm:flex-nowrap space-y-6 sm:space-y-0">
              <StatsCard
                title="Wind speed"
                metric={`${results.current_weather.windspeed.toFixed(1)} m/s`}
                color="cyan"
              />
              <StatsCard
                title="Wind direction"
                metric={`${results.current_weather.winddirection.toFixed(1)}°`}
                color="violet"
              />
            </div>
          </div>
        </div>
        <hr className="mb-5" />
        <div className="space-y-4 p-4">
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherReports;
