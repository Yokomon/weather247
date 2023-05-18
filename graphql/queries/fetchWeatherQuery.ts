import { gql } from "@apollo/client";

const fetchWeatherQuery = gql`
  query MyQuery(
    $current_weather: String
    $daily: String = "weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max"
    $hourly: String = "temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,uv_index,uv_index_clear_sky"
    $latitude: String!
    $longitude: String!
    $timezone: String = "auto"
  ) {
    myQuery(
      current_weather: $current_weather
      daily: $daily
      hourly: $hourly
      longitude: $longitude
      latitude: $latitude
      timezone: $timezone
    ) {
      elevation
      generationtime_ms
      latitude
      longitude
      timezone
      timezone_abbreviation
      utc_offset_seconds
      current_weather {
        is_day
        temperature
        time
        winddirection
        weathercode
        windspeed
      }
      daily {
        apparent_temperature_max
        apparent_temperature_min
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        uv_index_clear_sky_max
        uv_index_max
        weathercode
      }
      daily_units {
        sunrise
        sunset
        temperature_2m_max
        temperature_2m_min
        time
        weathercode
      }
      hourly {
        apparent_temperature
        dewpoint_2m
        precipitation_probability
        relativehumidity_2m
        temperature_2m
        time
        uv_index_clear_sky
        uv_index
      }
      hourly_units {
        apparent_temperature
        dewpoint_2m
        precipitation_probability
        relativehumidity_2m
        temperature_2m
        time
        uv_index
        uv_index_clear_sky
      }
    }
  }
`;

export { fetchWeatherQuery };
