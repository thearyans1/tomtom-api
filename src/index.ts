import { getPlaceAutocomplete } from "./maps-api";
import { AutoCompleteDetails } from "./types";

export async function getAutoCompleteDetails(
  address: string,
): Promise<AutoCompleteDetails[]> {
  const apiKey = process.env.TOMTOM_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is not defined");
  }
  if (!address) {
    throw new Error("Address is not set");
  }

  const autoCompleteAddresses = await getPlaceAutocomplete(apiKey, address);
  return autoCompleteAddresses.map(
    ({
      id: placeId,
      address: {
        streetNumber,
        countryCode,
        country,
        freeformAddress,
        municipality,
      },
    }) => ({
      placeId,
      streetNumber,
      countryCode,
      country,
      freeformAddress,
      municipality,
    }),
  );
}
