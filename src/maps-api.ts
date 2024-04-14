import axios, { AxiosRequestConfig } from "axios";
import { Countries, TomTomAddressType, TomTomResponseType } from "./types";

export async function getPlaceAutocomplete(
  key: string,
  address: string,
): Promise<TomTomAddressType[]> {
  const request: AxiosRequestConfig = {
    baseURL: process.env.TOMTOM_API_URL,
    params: {
      key,
      countrySet: Countries.Australia,
      limit: 100,
    },
  };

  const {
    data: { results },
  } = await axios.get<TomTomResponseType>(
    `/search/2/search/${encodeURI(address)}.json`,
    request,
  );

  return results;
}
