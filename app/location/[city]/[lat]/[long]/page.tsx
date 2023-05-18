import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import StatsCard from "@/components/StatsCard";
import { fetchWeatherQuery } from "@/graphql/queries/fetchWeatherQuery";

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherReports({ params }: Props) {
  const { long, lat } = params;
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
    <div>
      <div>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-semibold">Todays overview</h2>
            <p className="py-2 text-sm text-gray-400">
              Last updated at:&nbsp;
              {new Date(results.current_weather.time).toLocaleString()}&nbsp;
              {results.timezone}
            </p>
          </div>
          <div>
            <CalloutCard message="This is where GPT-4 Summary will go!" />
          </div>
          <div className="space-y-8 mt-8">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherReports;
