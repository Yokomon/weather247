interface CurrentWeather {
  is_day: number;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

interface Daily {
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weathercode: number[];
  uv_index_clear_sky_max: number[];
  uv_index_max: number[];
}

interface Hourly {
  apparent_temperature: number[];
  dewpoint_2m: number[];
  precipitation: number[];
  precipitation_probability: number[];
  rain: number[];
  relativehumidity_2m: number[];
  showers: number[];
  snow_depth: number[];
  snowfall: number[];
  temperature_2m: number[];
  time: [DateTime];
  uv_index: number[];
  uv_index_clear_sky: number[];
  windgusts_10m: number[];
}

interface DailyUnits {
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weathercode: string;
}

interface HourlyUnits {
  apparent_temperature: string;
  dewpoint_2m: string;
  precipitation_probability: string;
  relativehumidity_2m: string;
  temperature_2m: string;
  time: string;
  uv_index: string;
  uv_index_clear_sky: string;
}

interface Root {
  current_weather: CurrentWeather;
  daily: Daily;
  daily_units: DailyUnits;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
