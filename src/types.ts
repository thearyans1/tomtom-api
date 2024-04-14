export enum Countries {
  "Australia" = "AU",
}

type States = "NSW" | "NT" | "WA" | "SA" | "VIC" | "TAS" | "ACT" | "QLD";

export type Address = {
  streetNumber?: string;
  streetName: string;
  municipality?: string;
  countrySubdivisionCode: States;
  postalCode?: string;
  countryCode: string;
  country: keyof typeof Countries;
  freeformAddress: string;
};

export type AutoCompleteDetails = {
  placeId: string;
  streetName: string;
  streetNumber?: string;
  municipality?: string;
  state: States;
  postalCode?: string;
  countryCode: string;
  country: keyof typeof Countries;
  freeformAddress: string;
};

export type TomTomAddressType = {
  type: string;
  id: string;
  address: Address;
};

export type TomTomResponseType = {
  numResults: number;
  totalResults: number;
  offset: number;
  results: TomTomAddressType[];
};
