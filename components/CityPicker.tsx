"use client";

import { Country, City } from "country-state-city";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select from "react-select";
import { GlobeIcon } from "@heroicons/react/solid";

type countryOption = {
  label: string;
  value: {
    longitude: string;
    latitude: string;
    isoCode: string;
  };
} | null;

type cityOption = {
  label: string;
  value: {
    longitude: string;
    latitude: string;
    stateCode: string;
    countryCode: string;
    name: string;
  };
} | null;

const options = Country.getAllCountries().map(
  ({ latitude, longitude, isoCode, name }) => ({
    label: name,
    value: {
      longitude,
      latitude,
      isoCode,
    },
  })
);

export default function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<countryOption>(null);
  const [selectedCity, setSelectedCity] = useState<cityOption>(null);
  const router = useRouter();

  const handleSelectedCountry = (selectedCountry: countryOption) => {
    setSelectedCountry(selectedCountry);
    setSelectedCity(null);
  };

  const handleSelectedCity = (selectedCity: cityOption) => {
    setSelectedCity(selectedCity);
    router.push(
      `/location/${selectedCity!.value.name}/${selectedCity!.value.latitude}/${
        selectedCity!.value.longitude
      }`
    );
  };

  const cityOptions = City.getCitiesOfCountry(
    selectedCountry?.value.isoCode!
  )?.map(({ name, stateCode, countryCode, longitude, latitude }) => ({
    label: name,
    value: {
      stateCode,
      countryCode,
      longitude: longitude as string,
      latitude: latitude as string,
      name,
    },
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-600">
          <GlobeIcon className="h-5 w-5 text-black" />
          <label htmlFor="country" className="text-sm">
            Country
          </label>
        </div>
        <Select
          classNames={{
            control: () => "!cursor-pointer",
          }}
          value={selectedCountry}
          onChange={handleSelectedCountry}
          options={options}
        />
      </div>
      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <GlobeIcon className="h-5 w-5 text-black" />
            <label htmlFor="country" className="text-sm">
              City
            </label>
          </div>
          <Select
            classNames={{
              control: () => "!cursor-pointer",
            }}
            value={selectedCity}
            onChange={handleSelectedCity}
            options={cityOptions}
          />
        </div>
      )}
    </div>
  );
}
