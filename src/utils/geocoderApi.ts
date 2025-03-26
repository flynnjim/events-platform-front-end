import axios, { AxiosResponse } from "axios";

const API_KEY: string | undefined = import.meta.env.VITE_GEOCODER_API_KEY;

const geocoderApi = axios.create({
  baseURL: "https://geocode.maps.co",
});

interface GeocodeData {
  lat: string;
  lon: string;
  display_name: string;
}

export const fetchGeocode = (address: string): Promise<GeocodeData[]> => {
  return geocoderApi
    .get<GeocodeData[]>("/search", {
      params: {
        q: address,
        api_key: API_KEY,
      },
    })
    .then((response: AxiosResponse<GeocodeData[]>) => response.data)
    .catch((error: unknown) => {
      console.error("Error fetching geocode data: ", error);
      throw error;
    });
};
